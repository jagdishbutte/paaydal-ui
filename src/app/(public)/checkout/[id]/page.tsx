import CheckoutPage from '@/components/checkout/CheckOutPage'
import React from 'react'

type Props = {
    params: {
        id: string;
    };
};

export default function Page({ params }: Props) {
    return <CheckoutPage trekId={params.id} />;
}