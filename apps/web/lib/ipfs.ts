/**
 * 把 ipfs://CID/path 转换成可在浏览器访问的网关 URL
 * 你也可以换成自己 pin 服务的 gateway，更快更稳定
 */
export function ipfsToHttp(ipfsUri: string, gateway = "https://ipfs.io/ipfs/") {
  return ipfsUri.replace("ipfs://", gateway);
}
