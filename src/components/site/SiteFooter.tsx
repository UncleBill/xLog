import { APP_NAME, SITE_URL } from "~/lib/env"
import { UniLink } from "../ui/UniLink"
import { Profile, Note } from "~/lib/types"
import Script from "next/script"
import Image from "next/image"
import { Platform } from "~/components/site/Platform"
import { Trans } from "next-i18next"

export const SiteFooter: React.FC<{
  site?: Profile | null
  page?: Note | null
}> = ({ site, page }) => {
  const LogoWithLink = () => {
    return (
      <UniLink
        href={SITE_URL}
        className="hover:text-accent inline-flex items-center align-text-top mx-1"
      >
        <Image
          alt={APP_NAME}
          src={`${SITE_URL}/assets/logo.svg`}
          width={20}
          height={20}
        />
      </UniLink>
    )
  }

  return (
    <>
      <footer className="text-zinc-500 border-t">
        <div className="max-w-screen-md mx-auto px-5 py-10 text-xs flex justify-between">
          <p className="font-medium text-base">
            &copy;{" "}
            <UniLink href="/" className="hover:text-accent">
              {site?.name}
            </UniLink>{" "}
            ·{" "}
            <Trans
              i18nKey="powered by"
              defaults={"Powered by <name/>"}
              components={{
                name: <LogoWithLink />,
              }}
              ns="site"
            />
          </p>
          {site?.connected_accounts && (
            <div className="ml-5 -mr-5">
              {site?.connected_accounts.map((account, index) => (
                <Platform
                  key={index}
                  platform={account.platform}
                  username={account.identity}
                  className="mr-2 sm:mr-5"
                ></Platform>
              ))}
            </div>
          )}
        </div>
      </footer>
      {site?.ga && (
        <div className="xlog-google-analytics">
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=G-${site.ga}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-${site.ga}');
          `}
          </Script>
        </div>
      )}
    </>
  )
}
