# Start FastAPI Backend and Vite Frontend concurrently
Write-Host "==========================================" -ForegroundColor Magenta
Write-Host "  NOIRFORM Digital Studio - Starting Services" -ForegroundColor Magenta
Write-Host "==========================================" -ForegroundColor Magenta

# Check if Python is installed
$pythonCmd = (Get-Command python -ErrorAction SilentlyContinue)
if (-not $pythonCmd) {
    Write-Error "Python not found. Please install Python 3.10+."
    exit 1
}

# Check if Node is installed
$nodeCmd = (Get-Command node -ErrorAction SilentlyContinue)
if (-not $nodeCmd) {
    Write-Error "Node.js not found. Please install Node.js 18+."
    exit 1
}

Write-Host "1. Starting FastAPI Backend on http://127.0.0.1:8001..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host 'FastAPI Backend running on http://127.0.0.1:8001' -ForegroundColor Cyan; cd backend; python -m uvicorn main:app --reload --port 8001"

Write-Host "2. Starting React + Vite Frontend on http://localhost:5173..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host 'React Frontend running on http://localhost:5173' -ForegroundColor Green; cd frontend; npm run dev"

Write-Host "`nBoth services launched in separate windows!" -ForegroundColor Yellow
Write-Host "Visit: http://localhost:5173" -ForegroundColor White
