import multiparty from "multiparty";
export default async function handler(req, res) {
  const form = multiparty.Form();
}
export const config = {
  api: { bodyParser: false },
};
