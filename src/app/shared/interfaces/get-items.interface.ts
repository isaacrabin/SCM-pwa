// Generated by https://quicktype.io

export interface GetItemsResults {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: ModifiedBy;
  docstatus: number;
  idx: number;
  naming_series: string;
  item_code: string;
  item_name: string;
  item_group: string;
  is_zero_rated: number;
  stock_uom: string;
  disabled: number;
  allow_alternative_item: number;
  is_stock_item: number;
  has_variants: number;
  include_item_in_manufacturing: number;
  opening_stock: number;
  valuation_rate: number;
  standard_rate: number;
  is_fixed_asset: number;
  auto_create_assets: number;
  is_grouped_asset: number;
  over_delivery_receipt_allowance: number;
  over_billing_allowance: number;
  image?: string;
  description: string;
  shelf_life_in_days: number;
  end_of_life: string;
  default_material_request_type: string;
  valuation_method: string;
  weight_per_unit: number;
  allow_negative_stock: number;
  has_batch_no: number;
  create_new_batch: number;
  has_expiry_date: number;
  retain_sample: number;
  sample_quantity: number;
  has_serial_no: number;
  variant_based_on: string;
  min_order_qty: number;
  safety_stock: number;
  is_purchase_item: number;
  lead_time_days: number;
  last_purchase_rate: number;
  is_customer_provided_item: number;
  delivered_by_supplier: number;
  enable_deferred_expense: number;
  no_of_months_exp: number;
  country_of_origin: string;
  grant_commission: number;
  is_sales_item: number;
  max_discount: number;
  enable_deferred_revenue: number;
  no_of_months: number;
  inspection_required_before_purchase: number;
  inspection_required_before_delivery: number;
  is_sub_contracted_item: number;
  customer_code: string;
  published_in_website: number;
  total_projected_qty: number;
  doctype: Type;
  uoms: ItemDefault[];
  attributes: any[];
  customer_items: any[];
  taxes: any[];
  barcodes: any[];
  supplier_items: any[];
  reorder_levels: any[];
  item_defaults: ItemDefault[];
}

export enum Type {
  Item = "Item",
}

export interface ItemDefault {
  name: string;
  owner?: string;
  creation: string;
  modified: string;
  modified_by: ModifiedBy;
  docstatus: number;
  idx: number;
  company?: string;
  default_warehouse?: string;
  parent: string;
  parentfield: Parentfield;
  parenttype: Type;
  doctype: Doctype;
  income_account?: string;
  uom?: string;
  conversion_factor?: number;
}

export enum Doctype {
  ItemDefault = "Item Default",
  UOMConversionDetail = "UOM Conversion Detail",
}

export enum ModifiedBy {
  Administrator = "Administrator",
}

export enum Parentfield {
  ItemDefaults = "item_defaults",
  Uoms = "uoms",
}
