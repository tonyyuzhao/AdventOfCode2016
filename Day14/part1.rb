#!/usr/bin/env ruby
require 'digest'
require 'thread'

Salt = "abc"
Item = Struct.new(:md5, :char, :index)
Generated = Array.new
Key_Indices = Array.new
Buffer = Queue.new
@lock = Mutex.new

def produce (integer)
  return Digest::MD5.hexdigest Salt + integer.to_s
end

producer = Thread.new do
  i = 0
  loop do
    md5 = produce i
    @lock.synchronize do
      Generated << md5
    end
    if index = /([a-z0-9])\1\1/ =~ md5
      item = Item.new(md5, md5[index], i)
      Buffer << item
    end
    i += 1
  end
end

consumer = Thread.new do
  loop do
    if Key_Indices.length >= 64 then
      puts "64th valid hash: #{Key_Indices.sort[63]}"
      exit
    end
    item = Buffer.pop
    sleep(1) until !@lock.locked? && Generated.length > item.index + 1001
    Thread.new do
      (item.index + 1..item.index + 1001).each do |i|
        @lock.synchronize do
          md5 = Generated[i]
        end
        if /(#{item.char})\1\1\1\1/ =~ md5 then
          Key_Indices << item.index
          puts "Key_Indices: #{Key_Indices.sort}"
          Thread.exit
        end
      end
    end
  end
end

consumer.join
