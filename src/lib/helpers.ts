import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { prisma } from "./prisma";
import { stripe } from "./stripe";

export async function fetchSession() {
  const session = await getServerSession(authOptions);
  return session;
}

export async function createCustomerIfNull(session: any) {
  if (!session) {
    return "User must be logged in";
  }

  const user = await prisma.user.findFirst({
    where: {
      email: String(session?.user.email),
    },
  });

  if (!user) {
    return "No user found";
  }

  if (!user.stripe_customer_id) {
    const customer = await stripe.customers.create({
      email: String(session.user.email),
    });

    const updatedUser = await prisma.user.update({
      where: {
        email: String(session.user.email),
      },
      data: {
        stripe_customer_id: customer.id,
      },
    });

    return updatedUser;
  }

  return user.stripe_customer_id;
}

export async function hasSubscription(session: any) {
  const user = await prisma.user.findFirst({
    where: {
      email: String(session.user.email),
    },
  });

  const subscription = await stripe.subscriptions.list({
    customer: String(user?.stripe_customer_id),
  });

  console.log(subscription.data);

  if (subscription.data) {
    return subscription.data.length > 0;
  }

  return false;
}

export async function createCheckoutLink(session: any) {
  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  const checkout = await stripe.checkout.sessions.create({
    success_url: "http://localhost:3000/dashboard",
    cancel_url: "http://localhost:3000/dashboard",
    customer: String(user?.stripe_customer_id),
    line_items: [
      {
        price: "price_1NoKR6SDdmXy448EEtRiU2o0",
      },
    ],
    mode: "subscription",
  });

  return checkout.url;
}

export async function createCustomerPortalLink(session: any) {
  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  // const customerPortal = await stripe.billingPortal.sessions.create({
  //   customer: String(user?.stripe_customer_id),
  //   return_url: process.env.NEXTAUTH_URL + "/dashboard/settings/billing",
  // });

  // return customerPortal.url;
  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: String(user?.stripe_customer_id),
      return_url: process.env.NEXTAUTH_URL + "/dashboard",
    });

    return portalSession.url;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
