Discs = [
  [13, 13-11],
  [5, 5-0],
  [17, 17-11],
  [3, 3-0],
  [7, 7-2],
  [19, 19-17]
]

n = 1
top = [1, 0]
Discs.each do |disc|
  t_top = top[1]
  t_disc = disc[1] - n
  loop do
    if t_top == t_disc then
      top = [top[0].lcm(disc[0]), t_top]
      break
    elsif t_top < t_disc then
      t_top += top[0]
    else
      t_disc += disc[0]
    end
  end
  n += 1
end

puts "first time to press button: #{top[1]}"
