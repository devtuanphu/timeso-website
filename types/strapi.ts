type StrapiComponent<T> = { id: number } & T;

type StrapiObject<T> = {
  id: number;
  attributes: T;
};

type Single<T> = {
  data: StrapiObject<T> | null;
};

type Multiple<T> = {
  data: StrapiObject<T>[] | null;
};

type StrapiMedia = {
  name: string;
  size: number;
  mime: string;
  url: string;
  width: number | null;
  height: number | null;
  alternativeText: string | null;
  caption: string | null;
};

// Components
type StrapiSeo = NonNullable<
  StrapiComponent<{
    title: string;
    description: string;
  }>
>;

type StrapiButton = StrapiComponent<{
  url: string;
  text: string;
}>;

type StrapiLanguage = StrapiComponent<{
  code: string;
  name: string;
}>;

type StrapiNavigator = StrapiComponent<{
  title: string;
  subItems: StrapiComponent<{
    title: string;
    url: string;
  }>[];
  iconLinks: StrapiComponent<{
    icon: Single<StrapiMedia>;
    url: string;
  }>[];
}>;
