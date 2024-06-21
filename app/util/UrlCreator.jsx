const UrlCreator = (id) => {
  const idPerruno = id.toString();
  const url = "https://incomparable-snickerdoodle-b2eb5f.netlify.app/perro/";

  return url + idPerruno;
};

export default UrlCreator;
