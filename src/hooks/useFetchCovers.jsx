import { useCallback, useState, useEffect, useMemo } from "react";
import { useNetwork } from "@/src/context/Network";
import { toUtf8String } from "@ethersproject/strings";
import { useQuery } from "@/src/hooks/useQuery";
import { useIpfs } from "@/src/context/Ipfs";

const getQuery = () => {
  return `
  {
    covers {
      id
      key
      ipfsHash
      ipfsBytes
      stopped
    }
  }
`;
};

export const useFetchCovers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { networkId } = useNetwork();
  const { getIpfsByHash, updateIpfsData } = useIpfs();
  const { data: graphData, refetch } = useQuery();

  useEffect(() => {
    let ignore = false;

    function exec() {
      if (!graphData || !networkId) return;

      const _covers = graphData.covers || [];

      if (ignore) return;
      setData(_covers);

      _covers.forEach((_cover) => {
        try {
          JSON.parse(toUtf8String(_cover.ipfsBytes));
        } catch (err) {
          console.log("Could not parse ipfs bytes", _cover.key);
          updateIpfsData(_cover.ipfsHash); // Fetch data from IPFS
        }
      });
    }

    exec();

    return () => {
      ignore = true;
    };
  }, [graphData, networkId, updateIpfsData]);

  useEffect(() => {
    let ignore = false;

    setLoading(true);

    refetch(getQuery())
      .catch(console.error)
      .finally(() => {
        if (ignore) return;
        setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [refetch]);

  const getInfoByKey = useCallback(
    (coverKey) => {
      const _cover = data.find((x) => x.key === coverKey) || {};

      let ipfsData = _cover.ipfsData || getIpfsByHash(_cover.ipfsHash) || {};

      try {
        ipfsData = JSON.parse(toUtf8String(_cover.ipfsBytes));
      } catch (err) {
        console.log("Could not parse ipfs bytes", _cover.key);
      }

      return {
        key: _cover.key || "",
        coverName: ipfsData.coverName || "",
        projectName: ipfsData.projectName || "",
        tags: ipfsData.tags || [],
        about: ipfsData.about || "",
        rules: ipfsData.rules || "",
        links: ipfsData.links || {},
        pricingFloor: ipfsData.pricingFloor || "0",
        pricingCeiling: ipfsData.pricingCeiling || "0",
        reportingPeriod: ipfsData.reportingPeriod || 0,
        cooldownPeriod: ipfsData.cooldownPeriod || 0,
        claimPeriod: ipfsData.claimPeriod || 0,
        minReportingStake: ipfsData.minReportingStake || "0",
        resolutionSources: ipfsData.resolutionSources || [],
        stakeWithFees: ipfsData.stakeWithFees || "0",
        reassurance: ipfsData.reassurance || "0",

        // ipfsData: ipfsData, // TODO: remove this
      };
    },
    [data, getIpfsByHash]
  );

  // TODO: remove this
  const finalData = useMemo(
    () => data.map((x) => getInfoByKey(x.key)),
    [data, getInfoByKey]
  );

  return {
    data: finalData,
    getInfoByKey,
    loading,
  };
};
