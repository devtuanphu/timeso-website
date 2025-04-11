import PropTypes, { InferProps } from 'prop-types';

const BlogDetailTemplate2 = (props: BlogDetailTypes) => {
  const { dataBlog, dataNoCMS } = props;

  const addHost = (str: any, host: any) => {
    return str
      .split('src="/uploads')
      .join(`src=\"${host}/uploads`)
      .replace(
        /\[download](.*?)\[\/download\]/g,
        `<form id="basic" action="$1" method="get" target="_blank" autocomplete="off" class="ant-form ant-form-horizontal blogTemp2-form"><div class="ant-form-item"><div class="ant-row ant-form-item-row"><div class="ant-col ant-form-item-control"><div class="ant-form-item-control-input"><div class="ant-form-item-control-input-content"><input type="email" required placeholder="${dataNoCMS?.placeholder}" id="basic_email" aria-required="true" class="ant-input" type="text" value=""></div></div></div></div></div><div class="ant-form-item"><div class="ant-row ant-form-item-row"><div class="ant-col ant-form-item-control"><div class="ant-form-item-control-input"><div class="ant-form-item-control-input-content"><button type="submit" class="ant-btn ant-btn-primary ant-btn-lg ripple-button sketch-button "><span></span><span class="btn-content">${dataNoCMS?.button}</span><div class="sketch-button-lines"><span></span><span></span><span></span><span></span></div></button></div></div></div></div></div></form>`
      );
  };

  return (
    <div className='blogTemp2'>
      <div className='container'>
        <div
          dangerouslySetInnerHTML={{
            __html: addHost(dataBlog?.attributes?.content, process.env.NEXT_PUBLIC_STRAPI_URL),
          }}
        ></div>
      </div>
    </div>
  );
};

const blogDetailPropTypes = {
  dataBlog: PropTypes.any,
  dataNoCMS: PropTypes.shape({
    button: PropTypes.string,
    placeholder: PropTypes.string,
  }),
};

type BlogDetailTypes = InferProps<typeof blogDetailPropTypes>;

export { BlogDetailTemplate2 };
