import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function PaymentConfirm() {
	return (
		<div className='flex flex-col items-center justify-center px-5 mt-4 text-center' >
			<Image src='/verified.gif'
				alt='check'
				width={130}
				height={130}
			/>
			<h2 className='text-[24px]'>Payment Successful !</h2>
			<h2 className='text-[17px] text-center mt-6 text-gray-500'>We sent an email with your
				order confirmation
				along with Digital Content</h2>
			<Link
				href="/"
				className='btn btn-primary'>
				Go to Home</Link>

		</div>
	)
}

export default PaymentConfirm