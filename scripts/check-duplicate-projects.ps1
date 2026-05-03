param(
  [switch]$Quiet
)

$ErrorActionPreference = "Stop"

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  throw "git is required to run this script."
}

$repoRoot = git rev-parse --show-toplevel
if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($repoRoot)) {
  throw "Could not resolve git repository root."
}

Push-Location $repoRoot
try {
  # Paths to ignore: course/template trees where many package.json share a name by design.
  $ignorePathRegex = "[\\/](node_modules|dist|build|\.next)[\\/]|[\\/]04-javascript[\\/]05-libraries[\\/]3D[\\/]"

  $packageFiles = Get-ChildItem -Path . -Recurse -Filter "package.json" -File -ErrorAction SilentlyContinue |
    Where-Object { $_.FullName -notmatch $ignorePathRegex }

  $entries = foreach ($file in $packageFiles) {
    $relPath = Resolve-Path -Relative $file.FullName
    try {
      $json = Get-Content $file.FullName -Raw | ConvertFrom-Json
    } catch {
      Write-Warning ("Could not parse JSON: {0}" -f $relPath)
      continue
    }
    $name = $json.name
    if (-not $name) { continue }

    $parentName = Split-Path $file.Directory.FullName -Leaf

    [PSCustomObject]@{
      Path       = $relPath
      Name       = $name
      ParentDir  = $parentName
    }
  }

  $exitCode = 0

  Write-Output "=== Duplicate Project Names ==="
  $duplicates = $entries | Group-Object Name | Where-Object { $_.Count -gt 1 }
  if ($duplicates) {
    foreach ($group in $duplicates) {
      Write-Output ("name='{0}' appears in:" -f $group.Name)
      foreach ($entry in $group.Group) {
        Write-Output ("  - {0}" -f $entry.Path)
      }
    }
    $exitCode = 1
  } else {
    Write-Output "(none)"
  }

  Write-Output ""
  Write-Output "=== Mismatched name vs parent folder ==="
  # Only flag when both folder and name follow the proyecto-N pattern but DIFFER.
  # A real slug (e.g. 'smart-cooler-ui') in a 'proyecto-7' folder is allowed by policy.
  $mismatched = $entries | Where-Object {
    $_.Name -ne $_.ParentDir -and
    $_.ParentDir -match "^proyecto-\d+$" -and
    $_.Name -match "^proyecto-\d+$"
  }
  if ($mismatched) {
    foreach ($entry in $mismatched) {
      Write-Output ("  {0} -> name='{1}' (folder='{2}')" -f $entry.Path, $entry.Name, $entry.ParentDir)
    }
    $exitCode = 1
  } else {
    Write-Output "(none)"
  }

  Write-Output ""
  Write-Output ("=== Summary: {0} package.json scanned ===" -f $entries.Count)

  if ($exitCode -ne 0 -and -not $Quiet) {
    Write-Output ""
    Write-Output "Violations found. See 00-docs/00-overview/projects-location-policy.md"
  }

  exit $exitCode
}
finally {
  Pop-Location
}
