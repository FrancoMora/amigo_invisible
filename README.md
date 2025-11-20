# Hello Web

A very simple static web project: a Hello World heading, an input box, and a button that shows what you typed.

## Files
- `index.html` – Main page.
- `style.css` – Minimal styling.
- `script.js` – Button click handler.

## Open Directly
Just double-click `index.html` or run (PowerShell):
```powershell
Start-Process "$PWD/index.html"
```
Note: Direct file open is fine for this simple demo.

## Lightweight Local Servers (Optional)
Running a local server is useful if you later add modules, fetch calls, or routing.

### Option 1: Python (if installed)
```powershell
cd hello-web
python -m http.server 8000
```
Open: http://localhost:8000

### Option 2: Node (npx) – using `http-server`
If Node.js is installed:
```powershell
cd hello-web
npx http-server -p 8000
```
Open: http://localhost:8000

### Option 3: PowerShell Simple .NET HTTP Listener (no external tools)
```powershell
cd hello-web
Add-Type -AssemblyName System.Net.HttpListener
$h = New-Object System.Net.HttpListener
$h.Prefixes.Add('http://localhost:8000/')
$h.Start(); Write-Host 'Serving on http://localhost:8000'
while ($h.IsListening) {
  $ctx = $h.GetContext();
  $path = ($ctx.Request.Url.AbsolutePath.Trim('/') -replace '%20',' ')
  if ([string]::IsNullOrWhiteSpace($path)) { $path = 'index.html' }
  $file = Join-Path $PWD $path
  if (Test-Path $file) {
    $bytes = [System.IO.File]::ReadAllBytes($file)
    $ctx.Response.OutputStream.Write($bytes,0,$bytes.Length)
  } else { $ctx.Response.StatusCode = 404 }
  $ctx.Response.Close()
}
```
(Press Ctrl+C to stop.)

## Next Steps
- Add form validation.
- Persist data (localStorage).
- Switch to a framework if complexity grows.
