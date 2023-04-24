import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type InputMaybe<T> = T;
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** An arbitrary precision signed decimal */
  BigDecimal: number;
  /** An RFC-3339 compliant Full Date Scalar */
  Date: number;
  /** An RFC-3339 compliant DateTime Scalar */
  DateTime: number;
  /** An instantaneous point on the time-line represented by a standard date time string */
  Instant: any;
  /** A 64-bit signed integer */
  Long: number;
  /** An object scalar */
  Object: any;
  Short: any;
};
export type Page = {
  /** 当前页 */
  pageCurrent?: InputMaybe<Scalars["Int"]>;
  /** 页码大小 */
  pageSize?: InputMaybe<Scalars["Int"]>;
};
export type PageOrderTransferDetailInput = {
  /** 应用ID */
  appId?: InputMaybe<Scalars["ID"]>;
  /** 批次号 */
  batchCode?: InputMaybe<Scalars["String"]>;
  /** 费用单状态 */
  billStatusList?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  /** 调拨单号 */
  flowCode?: InputMaybe<Scalars["String"]>;
  /** 出/入库日期结束时间 */
  flowTimeEnd?: InputMaybe<Scalars["Long"]>;
  /** 出/入库日期开始时间 */
  flowTimeStart?: InputMaybe<Scalars["Long"]>;
  /** 出/入库单号 */
  orderCode?: InputMaybe<Scalars["String"]>;
  /** 调出/入组织 */
  orgId?: InputMaybe<Scalars["ID"]>;
  /** 分页参数 */
  page: Page;
  /** 商品名称 */
  skuName?: InputMaybe<Scalars["String"]>;
  /** 操作人 */
  userName?: InputMaybe<Scalars["String"]>;
  /** 所属仓库 */
  warehouse?: InputMaybe<Scalars["String"]>;
};

export const PagePeachOutOrderTransferDetailDocument = gql`
  query pagePeachOutOrderTransferDetail($input: PageOrderTransferDetailInput) {
    pagePeachOutOrderTransferDetail(input: $input) {
      pageCurrent
      pageSize
      records {
        amount
        billStatus
        billStatusDesc
        flowCode
        flowTime
        itemId
        orderCode
        originalBatchCode
        quantityDesc
        remark
        skuName
        sourceBelongOrg
        targetBelongOrg
        unitPrice
        userName
        warehouse
      }
      totalRecords
    }
  }
`;
