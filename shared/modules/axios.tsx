export const Axios = async (path: string, params: any = '', locale: string = 'vi') => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}${process.env.NEXT_PUBLIC_STRAPI_PREFIX}/${path}?locale=${locale}&${params}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
      },
    }
  );

  return res.json();
};

export const AxiosSubmitFile = async (data: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}${process.env.NEXT_PUBLIC_STRAPI_PREFIX}/upload`, {
    method: 'POST',
    body: data,
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
    },
  });

  return res.json();
};

export const AxiosSubmitForm = async (path: string, data: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}${process.env.NEXT_PUBLIC_STRAPI_PREFIX}/${path}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  return res.json();
};
