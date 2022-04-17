import Head from "next/head";

import { Container } from "@/src/common/components/container";
import { Hero } from "@/src/common/components/Hero";
import { HeroTitle } from "@/src/common/components/HeroTitle";
import { HeroStat } from "@/src/common/components/HeroStat";
import { MyLiquidityPage } from "@/src/modules/my-liquidity";
import { formatCurrency } from "@/utils/formatter/currency";
import { ComingSoon } from "@/src/common/components/ComingSoon";
import { useWeb3React } from "@web3-react/core";
import { useMyLiquidities } from "@/src/hooks/useMyLiquidities";
import { convertFromUnits } from "@/utils/bn";
import { isFeatureEnabled } from "@/src/config/environment";

export function getStaticProps() {
  return {
    props: {
      disabled: !isFeatureEnabled("liquidity"),
    },
  };
}

export default function MyLiquidity({ disabled }) {
  const { account } = useWeb3React();
  const { data, loading } = useMyLiquidities();
  const { totalLiquidityProvided } = data;

  if (disabled) {
    return <ComingSoon />;
  }

  return (
    <main>
      <Head>
        <title>Neptune Mutual Covers</title>
        <meta
          name="description"
          content="Get guaranteed payouts from our parametric cover model. Resolve incidents faster without the need for claims assessment."
        />
      </Head>

      <Hero>
        <Container className="flex flex-wrap px-2 py-20">
          <HeroTitle>My Liquidity</HeroTitle>
          {account && (
            <HeroStat title="My Total Liquidity">
              {loading && "Loading..."}
              {!loading &&
                `$ ${
                  formatCurrency(
                    convertFromUnits(totalLiquidityProvided),
                    "USD",
                    true
                  ).long
                }
                `}
            </HeroStat>
          )}
        </Container>
        <hr className="border-b border-B0C4DB" />
      </Hero>

      <MyLiquidityPage />
    </main>
  );
}
