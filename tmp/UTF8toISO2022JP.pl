#!/usr/bin/perl

use strict;
use warnings;
use utf8;
use Encode;
use Data::Dumper;

for(my $i = 0x1; $i <= 0xffff; $i++){
    if(0xd800 <= $i && $i <= 0xdfff){next;}
    if(0xfdd0 <= $i && $i <= 0xfdef){next;}
    if(0xfffe <= $i && $i <= 0xffff){next;}
    my @test = map {unpack('c', $_)} split(//, encode('ISO-2022-JP', pack('U', $i)));
    if($i != 0x3f && @test == 1 && $test[0] == 0x3f){next;}
    if(@test >= 3 && $test[0] == 0x1b && $test[1] == 0x24 && $test[2] == 0x28 && $test[3] == 0x44){next;}
    print '    convert[b.CodedCharacterSet["Unicode"].getCodePoint(' . sprintf("0x%x", $i) . ')] = [' . "\n";
    if(@test == 8 && $test[0] == 0x1b && $test[1] == 0x24 && $test[2] == 0x42 && $test[5] == 0x1b && $test[6] == 0x28 && $test[7] == 0x42){
        my $u = $test[3] - 0x20;
        my $l = $test[4] - 0x20;
        if(
            $u == 1 ||
            $u == 2 && (
                1 <= $l && $l <= 14 ||
                26 <= $l && $l <= 33 ||
                42 <= $l && $l <= 48 ||
                60 <= $l && $l <= 74 ||
                82 <= $l && $l <= 89 ||
                $l == 94
            ) ||
            $u == 3 && (
                16 <= $l && $l <= 25 ||
                33 <= $l && $l <= 58 ||
                65 <= $l && $l <= 90
            ) ||
            $u == 4 && (
                1 <= $l && $l <= 83
            ) ||
            $u == 5 && (
                1 <= $l && $l <= 86
            ) ||
            $u == 6 && (
                1 <= $l && $l <= 24 ||
                33 <= $l && $l <= 56
            ) ||
            $u == 7 && (
                1 <= $l && $l <= 33 ||
                49 <= $l && $l <= 81
            ) ||
            $u == 8 && (
                1 <= $l && $l <= 32
            ) ||
            (16 <= $u && $u <= 46) ||
            $u == 47 && (
                1 <= $l && $l <= 51
            ) ||
            (48 <= $u && $u <= 83) ||
            $u == 84 && (
                1 <= $l && $l <= 4
            )
        ){
            print '        {following:[], result:[b.CodedCharacterSet["JIS X 0208:1983"].getCodePoint(' . $u . ', ' . $l . ')]}';
        }elsif($u == 84 && ($l == 5 || $l == 6)){
            print '        {following:[], result:[b.CodedCharacterSet["JIS X 0208:1990"].getCodePoint(' . $u . ', ' . $l . ')]}';
        }else{
            die sprintf("0x%x", $i) . '/' . join(' ', map {sprintf('%02X', $_)} @test);
        }
    }elsif(@test == 1){
        print '        {following:[], result:[b.CodedCharacterSet["ASCII"].getCodePoint(' . sprintf("0x%x", $test[0]) . ')]}';
    }else{
        die sprintf("0x%x", $i) . '/' . join(' ', map {sprintf('%02X', $_)} @test);
    }
    print ' // ' . encode('UTF-8', pack('U', $i)) . "\n";
    print '    ];' . "\n";
}



#print map {pack('C', $_)} (0x83, 0x65, 0x83, 0x58, 0x83, 0x67);

#print sprintf("%02X\n", unpack('U', "\x{10000}"));
