import { Result } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export const WaitingPredictionMarket = () => <Result icon={<LoadingOutlined />} title="Create prediction market" subTitle="Waiting for stabilization..." />