export interface Quote {
  quote_created:Date;
  quote_expiration: Date;
  customer_id: number;
  product_id: number;
  quote_description: string;
  quote_price: number;
}
