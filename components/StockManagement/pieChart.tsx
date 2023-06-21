import React, { useEffect, useState } from "react";
import {
  Layout,
  Spin,
  Typography,
  theme,
} from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { ProCard, StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useGet } from "restful-react";
import { Router, useRouter } from "next/router";
import { BarGraph, Graph } from "./BarGraph/App";


const { Header, Content, Footer } = Layout;

const { Statistic } = StatisticCard;

const Piechart: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [responsive, setResponsive] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { data: batchData, loading, error, refetch } = useGet({
    path: 'BatchInformationService/GetBatchInformationByIngredient',
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
  console.log('b',batchData?.result);

  return (
    <Layout style={{ minHeight: "100vh"}}>
      <Layout>
        <div>
          <h1>Dashboard</h1>
          <div className="">
            {/* Place your profile and logout components here */}
            <LogoutOutlined />
          </div>
        </div>

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
                      split={responsive ? 'horizontal' : 'vertical'}
                       headerBordered
                     bordered
                        >
                  <ProCard split="horizontal">
                    <ProCard split="horizontal">
                      {batchData?.result.map((batch) => (
                        <ProCard key={batch.id} split="vertical">
                          <StatisticCard
                          onClick={()=>router.push(`/BatchInformation/${batch.name}`)} //call api to dhow ingreidents by food type.
                            statistic={{
                              title: batch.name,
                              value: batch.quantity,
                              description: (
                                <Statistic
                                  title="Production Date"
                                  value={batch.prodDate}
                                />
                              ),
                            }}
                          />
                          {/* Add more StatisticCard components as needed */}
                        </ProCard>
                      ))}
                    </ProCard>
                    <StatisticCard
                      title="Traffic Trends"
                      chart={
                        <img
                          src="https://gw.alipayobjects.com/zos/alicdn/_dZIob2NB/zhuzhuangtu.svg"
                          width="20%"
                        />
                      }
                    />
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
