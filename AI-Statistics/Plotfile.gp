reset
set terminal pngcairo size 1600,900 enhanced
set output 'Statistics8x7.png'
set xlabel 'Memory'
set ylabel 'turns'
set grid 
set xr [2:17]
set yr [40:250]
set xtics 1
set ytics 10
set mxtics 5
set mytics 5


set key outside top right

p "gnuplot8x7.dat" using 1:2:3 w e 

