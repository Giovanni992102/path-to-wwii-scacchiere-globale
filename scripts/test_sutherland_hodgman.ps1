function Clip-Polygon-HalfPlane($poly, [double]$nx, [double]$ny, [double]$c) {
    $out = @()
    $len = $poly.Count
    if ($len -lt 3) { return ,$out }

    $isClosed = ($poly[0][0] -eq $poly[$len-1][0] -and $poly[0][1] -eq $poly[$len-1][1])
    $pts = if ($isClosed) { $poly[0..($len-2)] } else { $poly }
    $n = $pts.Count

    for ($i = 0; $i -lt $n; $i++) {
        $curr = $pts[$i]
        $prev = if ($i -eq 0) { $pts[$n - 1] } else { $pts[$i - 1] }

        $currVal = $nx * $curr[0] + $ny * $curr[1] + $c
        $prevVal = $nx * $prev[0] + $ny * $prev[1] + $c

        $currIn = $currVal -ge -1e-9
        $prevIn = $prevVal -ge -1e-9

        if ($currIn) {
            if (-not $prevIn) {
                $t = $prevVal / ($prevVal - $currVal)
                $ix = [Math]::Round($prev[0] + $t * ($curr[0] - $prev[0]), 6)
                $iy = [Math]::Round($prev[1] + $t * ($curr[1] - $prev[1]), 6)
                $out += ,@($ix, $iy)
            }
            $out += ,@([Math]::Round($curr[0], 6), [Math]::Round($curr[1], 6))
        } elseif ($prevIn) {
            $t = $prevVal / ($prevVal - $currVal)
            $ix = [Math]::Round($prev[0] + $t * ($curr[0] - $prev[0]), 6)
            $iy = [Math]::Round($prev[1] + $t * ($curr[1] - $prev[1]), 6)
            $out += ,@($ix, $iy)
        }
    }

    if ($out.Count -gt 0) {
        if ($out[0][0] -ne $out[$out.Count-1][0] -or $out[0][1] -ne $out[$out.Count-1][1]) {
            $out += ,@($out[0][0], $out[0][1])
        }
    }
    return ,$out
}

$square = @(@(0,0), @(10,0), @(10,10), @(0,10), @(0,0))
$right = Clip-Polygon-HalfPlane $square 1 0 (-5)
$left = Clip-Polygon-HalfPlane $square (-1) 0 5

Write-Host "Left vertices: $($left.Count)"
foreach ($p in $left) { Write-Host "  $($p[0]), $($p[1])" }
Write-Host "Right vertices: $($right.Count)"
foreach ($p in $right) { Write-Host "  $($p[0]), $($p[1])" }
