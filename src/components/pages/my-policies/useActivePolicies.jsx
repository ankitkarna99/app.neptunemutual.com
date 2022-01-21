import { getGraphURL } from "@/src/config/environment";
import { useWeb3React } from "@web3-react/core";
import dayjs from "dayjs";
import { useState, useEffect } from "react";

export const useActivePolicies = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { chainId, account } = useWeb3React();

  useEffect(() => {
    if (!chainId || !account) {
      return;
    }

    const graphURL = getGraphURL(chainId);

    if (!graphURL) {
      return;
    }

    const now = dayjs().unix();

    setLoading(true);
    fetch(graphURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        query: `
        {
          userPolicies(
            where: {
              expiresOn_gt: "${now}"
              account: "${account}"
            }
          ) {
            id
            totalAmountToCover
            expiresOn
            cover {
              id
              projectName
            }
          }
        }
        `,
      }),
    })
      .then((r) => r.json())
      .then(({ data }) => {
        setData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [account, chainId]);

  return {
    data: {
      activePolicies: data?.userPolicies || [],
    },
    loading,
  };
};