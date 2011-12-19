#!/usr/bin/perl

use strict;
use warnings;
use utf8;
use Encode;
use Data::Dumper;

for(my $u = 1; $u <= 94; $u++){
    for(my $l = 1; $l <= 94; $l++){
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
            print '    jisx02081983[b.CodedCharacterSet["JIS X 0208:1983"].getCodePoint(' . $u . ', ' . $l . ')] = [' . "\n";
            print '        {following:[], result:[' . join(', ', map {'b.CodedCharacterSet["Unicode"].getCodePoint(' . sprintf('0x%x', unpack('U', $_)) . ')'} split(//, decode('ISO-2022-JP', "\x1b\x24\x42" . pack('C', $u + 0x20) . pack('C', $l + 0x20) . "\x1b\x28\x42"))) . ']}';
            print ' // ' . encode('UTF-8', decode('ISO-2022-JP', "\x1b\x24\x42" . pack('C', $u + 0x20) . pack('C', $l + 0x20) . "\x1b\x28\x42")) . "\n";
            print '    ];' . "\n";
        }
    }
}


#print map {pack('C', $_)} (0x83, 0x65, 0x83, 0x58, 0x83, 0x67);

#print sprintf("%X\n", unpack('U', "\x{10000}"));
