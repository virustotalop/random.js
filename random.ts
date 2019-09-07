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
	
class Random {
	
	private mask: bigint = BigInt(281474976710655);
	private multiplier: bigint = BigInt(25214903917);
	private addend: bigint = BigInt(11);
	private seed: bigint;
	constructor(seed: number)
	{
		this.setSeed(BigInt(seed));
	}

	private initialScramble(seed: bigint): bigint
	{
		return (seed ^ this.multiplier) & this.mask;
	}

	public setSeed(s: bigint): void
	{
		this.seed = this.initialScramble(s);
	}
	
	protected next(bits: number): bigint
	{
		this.seed = ((this.seed * this.multiplier) + this.addend) & this.mask;
		return (BigInt(this.seed) >> ((BigInt(48) - BigInt(bits))));
	}
	
	public nextFloat(): number
	{
		//Floats seem to be rounded to 7 decimal points
		let notRounded: bigint = (this.next(24) / (BigInt(1) << BigInt(24)));
		let rounded = Number(Number(notRounded).toFixed(7));
		return rounded;
	}
	
	public nextDouble(): number
	{
		return Number((BigInt(this.next(26)) << BigInt(27) + this.next(27)) / (BigInt(1) << BigInt(53)));
	}
	
	public nextInt(bound: number): number 
	{
		let r: bigint = this.next(31);
		let m: number = bound;
		if ((bound & m) == 0)  // i.e., bound is a power of 2
			r = ((BigInt(bound) * r)) >> (BigInt(31));
		else
		{
			for(let u: bigint = r; u - (r = u % BigInt(bound)) + BigInt(m) < 0; u = this.next(31));
		}
		return Number(r);
	}
	
	public nextBoolean(): boolean
	{
		return this.next(1) != BigInt(0);
	}
	//Implement nextGaussian
}