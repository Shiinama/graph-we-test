import { PropsWithChildren } from "react";
import { useLaunch } from "@tarojs/taro";
import graphqlClient from "../src/graphql/client";
import "./app.scss";
import { PagePeachOutOrderTransferDetailDocument } from "./graphql/gql";

function App({ children }: PropsWithChildren) {
  useLaunch(() => {
    console.log("App launched.");
  });
  // fetch("https://rekxrk.container-demo.hjgpscm.com/operation/graphql", {
  //   "headers": {
  //     "accept": "*/*",
  //     "accept-language": "zh-CN,zh;q=0.9",
  //     "authorization": "kktJLMPhAtduLA0Jl5dXqlx5b2HETHK5Ah/H2M1kJo4DiDGfdctWo7Vfh/oA9pGXFL3yB0ztGMFwK6TFla/GmA==",
  //     "content-type": "application/json",
  //     "sec-ch-ua": "\"Chromium\";v=\"112\", \"Google Chrome\";v=\"112\", \"Not:A-Brand\";v=\"99\"",
  //     "sec-ch-ua-mobile": "?0",
  //     "sec-ch-ua-platform": "\"macOS\"",
  //     "sec-fetch-dest": "empty",
  //     "sec-fetch-mode": "cors",
  //     "sec-fetch-site": "same-origin"
  //   },
  //   "referrer": "https://rekxrk.container-demo.hjgpscm.com/operation/finance-center/expense-peach/settlement-transfer/out-detail?pageCurrent=1&pageSize=10",
  //   "referrerPolicy": "strict-origin-when-cross-origin",
  //   "body": "{\"operationName\":\"pagePeachOutOrderTransferDetail\",\"variables\":{\"input\":{\"appId\":4,\"page\":{\"pageSize\":10,\"pageCurrent\":1}}},\"query\":\"query pagePeachOutOrderTransferDetail($input: PageOrderTransferDetailInput) {\\n  pagePeachOutOrderTransferDetail(input: $input) {\\n    pageCurrent\\n    pageSize\\n    records {\\n      amount\\n      billStatus\\n      billStatusDesc\\n      flowCode\\n      flowTime\\n      itemId\\n      orderCode\\n      originalBatchCode\\n      quantityDesc\\n      remark\\n      skuName\\n      sourceBelongOrg\\n      targetBelongOrg\\n      unitPrice\\n      userName\\n      warehouse\\n    }\\n    totalRecords\\n  }\\n}\"}",
  //   "method": "POST",
  //   "mode": "cors",
  //   "credentials": "include"
  // });

  function graphFetch() {
    graphqlClient
      .query({
        query: PagePeachOutOrderTransferDetailDocument,
        variables: {
          input: {
            page: { pageSize: 10, pageCurrent: 1 },
            appId: 4,
          },
        },
      })
      .then((res) => {
        console.log(res, 2);
      });
  }
  graphFetch();
  // children 是将要会渲染的页面
  return children;
}

export default App;
