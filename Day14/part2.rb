#!/usr/bin/env ruby
require 'digest'
require 'thread'

Salt = "jlmsuwbz"
Item = Struct.new(:md5, :char, :index)
Generated = Array.new
List = Array.new
Buffer = Queue.new

def produce (integer)
  md5 = Digest::MD5.hexdigest Salt + integer.to_s
  (1..2016).each do
    md5 = Digest::MD5.hexdigest md5.to_s
  end
  return md5
end

producer = Thread.new do
  i = 0
  loop do
    md5 = produce i
    Generated << md5
    if index = /([a-z0-9])\1\1/ =~ md5
      item = Item.new(md5, md5[index], i)
      Buffer << item
    end
    i += 1
  end
end

consumer = Thread.new do
  loop do
    if List.length >= 64 then
      puts "64th valid hash: #{List.sort[63]}"
      exit
    end
    item = Buffer.pop
    sleep(1) until Generated.length > item.index + 1001
    Thread.new do
      (item.index + 1..item.index + 1001).each do |i|
        if /(#{item.char})\1\1\1\1/ =~ Generated[i] then
          List << item.index
          puts "List: #{List.sort}"
          Thread.exit
        end
      end
    end
  end
end

consumer.join
