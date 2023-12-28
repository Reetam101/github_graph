import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Breadcrumb, Button, Dropdown, Flex, Input, Layout, List, Menu, Select, theme, Typography } from 'antd';
const { Header, Content, Footer } = Layout;
import GithubLogo from '../assets/github (1).png'
import { SearchOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
// import { ActivityCalendar } from 'react-activity-calendar'
import GitHubCalendar from 'react-github-calendar';
import axios from 'axios';

const { Title, Paragraph } = Typography

const explicitTheme = {
  light: ['#f0f0f0', '#c4edde', '#7ac7c4', '#f73859', '#384259'],
  dark: ['#383838', '#4D455D', '#7DB9B6', '#F5E9CF', '#E96479'],
};

const HomePage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [username, setUserName] = useState("")
  // const [contribData, setContribData] = useState([]);
  const [repos, setRepos] = useState([])
  const inputRef = useRef(null);
  const [reqYear, setReqYear] = useState(2023)

  const handleSearch = () => {
    console.log(inputRef.current.input.value)
    setUserName(inputRef.current.input.value)
    fetchRepositories(inputRef.current.input.value);
  }
  const fetchRepositories = async (name) => {
    const res = await axios.get(` https://api.github.com/users/${name}/repos`)
    setRepos(res.data);
    console.log(res.data);
  }



  const items = [
  ]
  for (let year = 2016; year <= 2023; year++) {
    items.push({
      value: `${year}`,
      label: `${year}`,
    });
  }

  const handleChange = (value) => {
    setReqYear(value);
  };

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" style={{ marginTop: "20px", padding: "6px" }}>
          <img src={GithubLogo} style={{ width: "65px", height: "65px" }} />
        </div>

      </Header>
      <Content
        style={{
          padding: '0 48px',
        }}
      >
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* graph */}
          <Row>
            <Col span={8}>
              <Flex gap="small" horizontal>
                <Input placeholder="search" prefix={<SearchOutlined />} ref={inputRef} />
                <Button onClick={handleSearch} type="primary">Search</Button>

              </Flex>
            </Col>
          </Row>
          <Flex vertical gap="middle">
            {
              username ? (<GitHubCalendar username={username} theme={explicitTheme} year={parseInt(reqYear)} />) : (<h4>Search empty!</h4>)
            }

            <div style={{
              // width: '25%',
            }}>

              <Select
                defaultValue="2023"
                style={{
                  width: 120,
                }}
                onChange={handleChange}
                options={items}
              />

            </div>
            <List
              size="large"
              itemLayout="vertical"
              header={<div>Repositories</div>}
              dataSource={repos}
              renderItem={(item, index) => <List.Item key={index}>
                <Title level={4}>{item.name}</Title>
                <Paragraph>Forks: {item.forks}</Paragraph>
                <Paragraph>Stars: {item.stargazers_count}</Paragraph>
                <Paragraph>Watchers: {item.watchers}</Paragraph>
              </List.Item>}
            />
          </Flex>

        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default HomePage;