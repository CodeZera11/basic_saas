"use client";

import React, { useEffect } from 'react'

const StripePricingTable = () => {

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://js.stripe.com/v3/pricing-table.js"
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script)
        }
    }, [])


    return React.createElement("stripe-pricing-table", {
        "pricing-table-id": "prctbl_1NoLZISDdmXy448EeLBveiqD",
        "publishable-key":
            "pk_test_51NoKFfSDdmXy448EdDx10AKY1UAmtK4F5LRm2TBW5KuEofW6hG0RTtwBz3yAwZtrhpwtrxikoYOtOdqNHQRa2EpY00uhGUGm3P",
    });
}

export default StripePricingTable