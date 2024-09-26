import { 
    type SubscriberConfig, 
    type SubscriberArgs,
    OrderService,
  } from "@medusajs/medusa"
  
  export default async function handleAutomaticCapture({ 
    data, eventName, container, pluginOptions, 
  }: SubscriberArgs<Record<string, string>>) {
    const sendGridService = container.resolve("sendgridService")
    const orderService: OrderService = container.resolve(
      "orderService"
    ) as OrderService
  
    const order = await orderService.retrieve(data.id, {
      relations: ["items","payments"],
    })
  
    for (const payment of order.payments) {
        if(payment.provider_id === "razorpay")
            if( (payment.data.status as string)?.toLowerCase() == "authorized"){
            await orderService.capturePayment(order.id);      
            break;      
        }}
    
    }
  
  export const config: SubscriberConfig = {
    event: OrderService.Events.PLACED,
    context: {
      subscriberId: "capture-payment-handler",
    },
  }
  