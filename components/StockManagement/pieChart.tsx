import React, { useEffect, useState } from "react";
import { Layout, Spin, Typography, theme, Card, Row, Col } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import RcResizeObserver from "rc-resize-observer";
import { useGet } from "restful-react";
import { Router, useRouter } from "next/router";
import { BarGraph, Graph } from "./GetBatchInformationByIngredient/App";

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

const Piechart: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [responsive, setResponsive] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { data: batchData, loading, error, refetch } = useGet({
    path: "BatchInformationService/GetBatchInformationByIngredient",
  });

  useEffect(() => {
    refetch(); // Fetch the data initially and whenever needed
  }, [refetch]);

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <div>Error: Failed to fetch data from the API.</div>;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />

        <Content style={{ height: "calc(80vh - 64px)", overflow: "auto" }}>
          <div
            style={{
              padding: 24,
              minHeight: "80%",
              background: colorBgContainer,
            }}
          >
            <div>
              <RcResizeObserver
                key="resize-observer"
                onResize={(offset) => {
                  setResponsive(offset.width < 406);
                }}    
              >
                <ProCard
                  title="Fresh Stock Levels"
                  extra={new Date().toLocaleDateString()} // Display current date
                  split={responsive ? "horizontal" : "vertical"}
                  headerBordered
                  bordered
                >
                  <ProCard split="horizontal">
                    <ProCard split="horizontal">
                      <Row gutter={[16, 16]}>
                        {batchData?.result.map((batch) => (
                          <Col key={batch.id} span={8}>
                            <Card
                              onClick={() =>
                                router.push(`/BatchInformation/${batch.name}`)
                              }
                              style={{ marginBottom: 16 }}
                              size="small"
                              title={batch.name}
                            >
                              <Text strong>Quantity: </Text>
                              <Text>{batch.quantity}</Text>
                              <br />
                              <Text strong>Production Date: </Text>
                              <Text>{batch.prodDate}</Text>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </ProCard>
                  </ProCard>
                </ProCard>
              </RcResizeObserver>
              {/* <BarGraph /> */}
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          GVMS ©2023 Created by Fair Enough
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Piechart;
