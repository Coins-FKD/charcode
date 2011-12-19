#!/usr/bin/perl

use strict;
use warnings;
use utf8;
use Encode;
use Data::Dumper;

print Data::Dumper->Dump([pack('U', 0x3042)]);

#print map {pack('C', $_)} (0x83, 0x65, 0x83, 0x58, 0x83, 0x67);

#print sprintf("%X\n", unpack('U', "\x{10000}"));
