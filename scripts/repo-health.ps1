param(
  [int]$Top = 15
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
  $tracked = git ls-files
  if ($LASTEXITCODE -ne 0) {
    throw "git ls-files failed."
  }

  $totalTracked = $tracked.Count
  $nodeModulesTracked = ($tracked | Where-Object { $_ -match "/node_modules/" } | Measure-Object).Count
  $distTracked = ($tracked | Where-Object { $_ -match "/dist/" -or $_ -match "/build/" } | Measure-Object).Count
  $cleanTracked = $totalTracked - $nodeModulesTracked - $distTracked

  Write-Output "=== Repo Health ==="
  Write-Output ("Tracked files: {0}" -f $totalTracked)
  Write-Output ("Tracked node_modules files: {0}" -f $nodeModulesTracked)
  Write-Output ("Tracked dist/build files: {0}" -f $distTracked)
  Write-Output ("Tracked files without generated dirs: {0}" -f $cleanTracked)

  Write-Output ""
  Write-Output "=== Module Summary ==="

  $modules = Get-ChildItem -Directory | Where-Object { $_.Name -match "^[0-9]{2}-" } | Sort-Object Name
  $moduleRows = foreach ($module in $modules) {
    $children = Get-ChildItem $module.FullName -Directory -ErrorAction SilentlyContinue
    $childrenWithoutReadme = 0

    foreach ($child in $children) {
      $hasReadme = (Test-Path (Join-Path $child.FullName "README.md")) -or (Test-Path (Join-Path $child.FullName "readme.md"))
      if (-not $hasReadme) {
        $childrenWithoutReadme++
      }
    }

    [PSCustomObject]@{
      Module                    = $module.Name
      TrackedFiles              = ($tracked | Where-Object { $_ -like "$($module.Name)/*" }).Count
      ChildDirs                 = $children.Count
      ChildDirsWithoutReadme    = $childrenWithoutReadme
    }
  }

  $moduleRows | Format-Table -AutoSize

  Write-Output ""
  Write-Output ("=== Densest Paths (Top {0}, excluding node_modules/dist/build) ===" -f $Top)

  $densest = $tracked |
    Where-Object { $_ -notmatch "/node_modules/" -and $_ -notmatch "/dist/" -and $_ -notmatch "/build/" } |
    ForEach-Object {
      $parts = $_ -split "/"
      if ($parts.Length -ge 3) {
        "$($parts[0])/$($parts[1])/$($parts[2])"
      } elseif ($parts.Length -eq 2) {
        "$($parts[0])/$($parts[1])"
      } else {
        $parts[0]
      }
    } |
    Group-Object |
    Sort-Object Count -Descending |
    Select-Object -First $Top |
    ForEach-Object {
      [PSCustomObject]@{
        Path  = $_.Name
        Files = $_.Count
      }
    }

  $densest | Format-Table -AutoSize

  Write-Output ""
  Write-Output "=== README Case ==="
  $upperReadme = ($tracked | Where-Object { $_ -cmatch "(^|/)README\.md$" } | Measure-Object).Count
  $lowerReadme = ($tracked | Where-Object { $_ -cmatch "(^|/)readme\.md$" } | Measure-Object).Count
  Write-Output ("README.md: {0}" -f $upperReadme)
  Write-Output ("readme.md: {0}" -f $lowerReadme)
}
finally {
  Pop-Location
}
