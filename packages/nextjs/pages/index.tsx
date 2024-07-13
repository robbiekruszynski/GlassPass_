import { useEffect } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import { useGlobalState } from "~~/services/store/store";
import { web3AuthInstance } from "~~/services/web3/wagmiConnectors";

const Home: NextPage = () => {
  const setUserInfo = useGlobalState(state => state.setUserInfo);
  const { connector } = useAccount();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        if (web3AuthInstance) {
          const userInfo = await web3AuthInstance.getUserInfo();
          console.log(userInfo);
          setUserInfo(userInfo);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUserInfo();
  }, [connector]);

  return (
    <>
      {/* <MetaHeader /> */}
      <div className="flex items-center flex-col flex-grow pt-10">
        {/* <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">GlassPass</span>
          </h1>
        </div> */}

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
               
                <Link href="/debug" passHref className="link">
                Query Location
                </Link>{" "}
                
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <SparklesIcon className="h-8 w-8 fill-secondary" />
              <p>
               
                <Link href="/example-ui" passHref className="link">
                  Reserve
                </Link>{" "}
              
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
              
                <Link href="/blockexplorer" passHref className="link">
                 Activate
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
