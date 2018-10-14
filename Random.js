/*
 * Copyright (c) 1995, 2013, Oracle and/or its affiliates. All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Oracle designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Oracle in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Oracle, 500 Oracle Parkway, Redwood Shores, CA 94065 USA
 * or visit www.oracle.com if you need additional information or have any
 * questions.
 */
 
//Modified version of java.util.Random ported to javascript uses BigInteger library
//https://github.com/peterolson/BigInteger.js
	
function Random(seed) 
{
	const mask = bigInt(281474976710655);
	const multiplier = bigInt(25214903917);
	const addend = 11;
	
	this.initialScramble = function(seed) 
	{
		return (bigInt(seed).xor(multiplier)).and(mask);
	}

	this.setSeed = function(s)
	{
		this.seed = this.initialScramble(s);
	}
	
	this.next = function(bits)
	{
		this.seed = (bigInt(this.seed).multiply(multiplier).add(addend)).and(mask);
		return (bigInt(this.seed).shiftRight(48 - bits));
	}
    
	this.nextInt = function(bound) 
	{
		var r = this.next(31);
		var m = bound;
		if ((bound & m) == 0)  // i.e., bound is a power of 2
			r = ((bigInt(bound).multiply(r)).shiftRight(31));
		else
		{
			for(var u = r; u - (r = u % bound) + m < 0; u = this.next(31));
		}
		return r;
	}
	
	this.seed = this.initialScramble(seed);
	//Cannot use setSeed due to initialization
}