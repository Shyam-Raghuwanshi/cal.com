import { withAppDirSsr } from "app/WithAppDirSsr";
import type { PageProps } from "app/_types";
import { _generateMetadata } from "app/_utils";
import { WithLayout } from "app/layoutHOC";
import { headers, cookies } from "next/headers";

import { getLayout } from "@calcom/features/MainLayoutAppDir";

import { buildLegacyCtx } from "@lib/buildLegacyCtx";

import LegacyPage from "~/users/views/users-public-view";
import { getServerSideProps, type UserPageProps } from "~/users/views/users-public-view.getServerSideProps";

export const generateMetadata = async ({ params, searchParams }: PageProps) => {
  const props = await getData(buildLegacyCtx(headers(), cookies(), params, searchParams));

  const { profile, markdownStrippedBio } = props;
  return await _generateMetadata(
    () => profile.name,
    () => markdownStrippedBio
  );
};

const getData = withAppDirSsr<UserPageProps>(getServerSideProps);
export default WithLayout({ getLayout, getData, Page: LegacyPage })<"P">;
