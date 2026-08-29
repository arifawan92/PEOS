$Root = "D:\Arif Workspace\Projects\PEOS"
$Report = Join-Path $Root "PEOS-Current-Verification.txt"
$Baseline = Join-Path $Root "PEOS-Integrity-Baseline.json"

$Results = @()

function Add-Result($Name,$Status,$Detail) {
    $Results += [PSCustomObject]@{
        Check=$Name
        Status=$Status
        Detail=$Detail
    }
}

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "              PEOS AUTOMATED VERIFICATION" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "Root: $Root"
Write-Host "Date: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
Write-Host ""

# 1. Required files
$Files = @(
"package.json",
"package-lock.json",
"index.html",
"vite.config.js",
"src\services\projectService.js",
"src\context\AppContext.jsx",
"src\components\layout\WorkingArea.jsx",
"src\pages\Projects.jsx",
"src\components\projects\ProjectList.jsx",
"src\components\projects\CreateProjectDialog.jsx",
"src\components\projects\ProjectToolbar.jsx",
"src\components\projects\EmptyProjects.jsx"
)

Write-Host "[1] REQUIRED FILES"

$Missing = @()

foreach ($File in $Files) {
    $Path = Join-Path $Root $File

    if (Test-Path $Path) {
        Write-Host "[PASS] $File" -ForegroundColor Green
    }
    else {
        Write-Host "[FAIL] $File" -ForegroundColor Red
        $Missing += $File
    }
}

if ($Missing.Count -eq 0) {
    $FileStatus = "PASS"
}
else {
    $FileStatus = "FAIL"
}

# 2. Integrity
Write-Host ""
Write-Host "[2] WORKSPACE INTEGRITY"

$Changed = @()

if (Test-Path $Baseline) {

    $BaselineData = Get-Content $Baseline -Raw | ConvertFrom-Json

    foreach ($Entry in $BaselineData) {

        $Path = Join-Path $Root $Entry.Path

        if (-not (Test-Path $Path)) {
            $Changed += "$($Entry.Path) [MISSING]"
            continue
        }

        $CurrentHash = (Get-FileHash $Path -Algorithm SHA256).Hash

        if ($CurrentHash -ne $Entry.SHA256) {
            $Changed += "$($Entry.Path) [CHANGED]"
        }
    }

    if ($Changed.Count -eq 0) {
        Write-Host "[PASS] No baseline changes detected" -ForegroundColor Green
        $IntegrityStatus = "PASS"
    }
    else {
        Write-Host "[WARN] Changes detected:" -ForegroundColor Yellow

        foreach ($Item in $Changed) {
            Write-Host "       $Item" -ForegroundColor Yellow
        }

        $IntegrityStatus = "CHANGED"
    }
}
else {
    Write-Host "[FAIL] Integrity baseline missing" -ForegroundColor Red
    $IntegrityStatus = "FAIL"
}

# 3. Persistence source check
Write-Host ""
Write-Host "[3] PERSISTENCE SOURCE"

$ServicePath = Join-Path $Root "src\services\projectService.js"

if (Test-Path $ServicePath) {

    $ServiceText = Get-Content $ServicePath -Raw

    $HasLocalStorage =
        ($ServiceText -match "localStorage") -or
        ($ServiceText -match "sessionStorage")

    if ($HasLocalStorage) {
        Write-Host "[PASS] Persistent storage reference detected" -ForegroundColor Green
        $PersistenceStatus = "PASS"
    }
    else {
        Write-Host "[WARN] No browser persistent storage reference detected" -ForegroundColor Yellow
        $PersistenceStatus = "NOT-CONFIRMED"
    }
}
else {
    Write-Host "[FAIL] projectService.js missing" -ForegroundColor Red
    $PersistenceStatus = "FAIL"
}

# 4. Build
Write-Host ""
Write-Host "[4] BUILD"

Push-Location $Root
npm run build *> $null
$BuildExit = $LASTEXITCODE
Pop-Location

if ($BuildExit -eq 0) {
    Write-Host "[PASS] npm run build" -ForegroundColor Green
    $BuildStatus = "PASS"
}
else {
    Write-Host "[FAIL] npm run build" -ForegroundColor Red
    $BuildStatus = "FAIL"
}

# 5. Dist
Write-Host ""
Write-Host "[5] DIST"

if (Test-Path (Join-Path $Root "dist")) {
    Write-Host "[PASS] dist exists" -ForegroundColor Green
    $DistStatus = "PASS"
}
else {
    Write-Host "[FAIL] dist missing" -ForegroundColor Red
    $DistStatus = "FAIL"
}

# 6. Git
Write-Host ""
Write-Host "[6] GIT"

Push-Location $Root
git status *> $null
$GitExit = $LASTEXITCODE
Pop-Location

if ($GitExit -eq 0) {
    Write-Host "[PASS] Git repository detected" -ForegroundColor Green
    $GitStatus = "PASS"
}
else {
    Write-Host "[INFO] Git not configured - NON-BLOCKING" -ForegroundColor Yellow
    $GitStatus = "NON-BLOCKING"
}

# Final
$BlockingFailure =
    ($FileStatus -eq "FAIL") -or
    ($IntegrityStatus -eq "FAIL") -or
    ($BuildStatus -eq "FAIL") -or
    ($DistStatus -eq "FAIL")

if ($BlockingFailure) {
    $Final = "BLOCKED"
}
else {
    $Final = "READY"
}

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "FINAL VERIFICATION RESULT" -ForegroundColor Cyan
Write-Host "============================================================"

Write-Host "FILES       = $FileStatus"
Write-Host "INTEGRITY   = $IntegrityStatus"
Write-Host "PERSISTENCE = $PersistenceStatus"
Write-Host "BUILD       = $BuildStatus"
Write-Host "DIST        = $DistStatus"
Write-Host "GIT         = $GitStatus"
Write-Host "FINAL       = $Final"

Write-Host ""
Write-Host "COPY-FRIENDLY RESULT:" -ForegroundColor Cyan
Write-Host "RESULT=$Final | FILES=$FileStatus | INTEGRITY=$IntegrityStatus | PERSISTENCE=$PersistenceStatus | BUILD=$BuildStatus | DIST=$DistStatus | GIT=$GitStatus"

@"
============================================================
PEOS AUTOMATED VERIFICATION REPORT
============================================================
Date: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
Root: $Root

FILES       = $FileStatus
INTEGRITY   = $IntegrityStatus
PERSISTENCE = $PersistenceStatus
BUILD       = $BuildStatus
DIST        = $DistStatus
GIT         = $GitStatus
FINAL       = $Final

CHANGES DETECTED:
$($Changed -join "`r`n")

MANUAL FUNCTIONAL TEST:
[ ] Create Project
[ ] Project appears
[ ] Refresh application
[ ] Project remains after Refresh

FINAL:
RESULT=$Final | FILES=$FileStatus | INTEGRITY=$IntegrityStatus | PERSISTENCE=$PersistenceStatus | BUILD=$BuildStatus | DIST=$DistStatus | GIT=$GitStatus
============================================================
"@ | Set-Content $Report -Encoding UTF8

Write-Host ""
Write-Host "REPORT: $Report" -ForegroundColor Green
