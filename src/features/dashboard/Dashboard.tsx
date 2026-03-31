import { Container, Group, Grid, Card, Text } from '@mantine/core';

export default function Dashboard() {
  return (
    <Container size="lg">
      <Group justify="space-between" mb="md">
        <Text size="xl" fw={700}>
          Dashboard
        </Text>
      </Group>

      <Grid>
        <Grid.Col span={4}>
          <Card shadow="sm" p="lg">
            <Text>Total Users</Text>
            <Text size="xl" fw={700}>1,234</Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={4}>
          <Card shadow="sm" p="lg">
            <Text>Revenue</Text>
            <Text size="xl" fw={700}>$5,678</Text>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
}