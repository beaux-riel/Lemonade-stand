# Lemonade Stand UI Component Library

A bright, colorful, child-friendly UI component library for the Lemonade Stand application. This library provides reusable components with a playful design using a yellow, pink, and blue color palette.

## Color Palette

- **Yellow**: `#FFEB3B` (Primary)
- **Pink**: `#F48FB1` (Accent)
- **Blue**: `#64B5F6` (Secondary)

Each color has light and dark variants available through Tailwind CSS classes.

## Typography

- **Display Font**: Fredoka One (for headings and emphasis)
- **Body Font**: Nunito (for regular text)

## Components

### Buttons

```jsx
import { Button } from './components/ui';

// Variants
<Button>Default Button</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="accent">Accent</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// Sizes
<Button size="sm">Small</Button>
<Button>Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>

// Rounded corners
<Button rounded="none">Square</Button>
<Button rounded="sm">Rounded SM</Button>
<Button rounded="md">Rounded MD</Button>
<Button rounded="lg">Rounded LG</Button>
<Button rounded="full">Pill</Button>

// Other props
<Button disabled>Disabled</Button>
<Button animated>Animated</Button>
<Button fullWidth>Full Width Button</Button>
```

### Cards

```jsx
import { Card } from './components/ui';

<Card>
  <Card.Header>
    <h3 className="text-xl font-display">Default Card</h3>
  </Card.Header>
  <Card.Body>
    <p>This is a default card with a header and body.</p>
  </Card.Body>
  <Card.Footer>
    <Button size="sm">Action</Button>
  </Card.Footer>
</Card>

// Variants
<Card variant="yellow" hover>...</Card>
<Card variant="blue" rounded="xl">...</Card>
<Card variant="pink">...</Card>
<Card variant="outlined">...</Card>
```

### Forms

```jsx
import { Form } from './components/ui';

<Form onSubmit={handleSubmit}>
  <Form.Group>
    <Form.Label htmlFor="name" required>Name</Form.Label>
    <Form.Input
      id="name"
      name="name"
      value={value}
      onChange={handleChange}
      placeholder="Enter your name"
      required
    />
  </Form.Group>
  
  <Form.Group>
    <Form.Label htmlFor="message">Message</Form.Label>
    <Form.Textarea
      id="message"
      name="message"
      value={value}
      onChange={handleChange}
      placeholder="Enter your message"
      rows={3}
    />
  </Form.Group>
  
  <Form.Group>
    <Form.Label htmlFor="fruit">Favorite Fruit</Form.Label>
    <Form.Select
      id="fruit"
      name="fruit"
      value={value}
      onChange={handleChange}
      options={[
        { value: 'lemon', label: 'Lemon' },
        { value: 'orange', label: 'Orange' },
      ]}
    />
  </Form.Group>
  
  <Form.Group>
    <Form.Checkbox
      id="newsletter"
      name="newsletter"
      checked={checked}
      onChange={handleChange}
      label="Subscribe to newsletter"
    />
  </Form.Group>
  
  <Form.Group>
    <Form.Radio
      id="preference-lemonade"
      name="preference"
      value="lemonade"
      checked={checked}
      onChange={handleChange}
      label="Lemonade"
    />
  </Form.Group>
</Form>
```

### Navigation

```jsx
import { Navigation } from './components/ui';

<Navigation
  brand={<span className="text-xl font-bold">Lemonade Stand</span>}
  items={[
    { label: 'Home', href: '#', active: true },
    { label: 'Stands', href: '#' },
    { label: 'Products', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' },
  ]}
/>

// Variants
<Navigation variant="blue">...</Navigation>
<Navigation variant="pink">...</Navigation>
<Navigation variant="white">...</Navigation>
```

### Alerts

```jsx
import { Alert } from './components/ui';

<Alert variant="info" title="Information">
  This is an information alert with a title.
</Alert>

<Alert variant="success" title="Success">
  This is a success alert with a title.
</Alert>

<Alert variant="warning" title="Warning">
  This is a warning alert with a title.
</Alert>

<Alert variant="error" title="Error">
  This is an error alert with a title.
</Alert>

<Alert
  variant="info"
  dismissible
  onDismiss={() => alert('Alert dismissed')}
  icon={<svg>...</svg>}
>
  This is a dismissible alert with an icon.
</Alert>
```

### Badges

```jsx
import { Badge } from './components/ui';

// Variants
<Badge>Default</Badge>
<Badge variant="blue">Blue</Badge>
<Badge variant="pink">Pink</Badge>
<Badge variant="green">Green</Badge>
<Badge variant="red">Red</Badge>
<Badge variant="gray">Gray</Badge>
<Badge variant="outline">Outline</Badge>

// Sizes
<Badge size="sm">Small</Badge>
<Badge>Medium</Badge>
<Badge size="lg">Large</Badge>

// Rounded corners
<Badge rounded="none">Square</Badge>
<Badge rounded="sm">Rounded SM</Badge>
<Badge rounded="md">Rounded MD</Badge>
<Badge>Rounded Full</Badge>
```

### Avatars

```jsx
import { Avatar } from './components/ui';

// Sizes
<Avatar src="path/to/image.jpg" alt="User Name" size="xs" />
<Avatar src="path/to/image.jpg" alt="User Name" size="sm" />
<Avatar src="path/to/image.jpg" alt="User Name" />
<Avatar src="path/to/image.jpg" alt="User Name" size="lg" />
<Avatar src="path/to/image.jpg" alt="User Name" size="xl" />

// Variants
<Avatar alt="John Doe" />
<Avatar alt="Jane Smith" variant="square" />
<Avatar alt="Bob Johnson" variant="rounded" />

// Status
<Avatar alt="John Doe" status="online" />
<Avatar alt="Jane Smith" status="offline" />
<Avatar alt="Bob Johnson" status="busy" />
<Avatar alt="Alice Brown" status="away" />

// Avatar Group
<Avatar.Group>
  <Avatar src="path/to/image1.jpg" alt="User 1" />
  <Avatar src="path/to/image2.jpg" alt="User 2" />
  <Avatar src="path/to/image3.jpg" alt="User 3" />
</Avatar.Group>

// Avatar Group with max display
<Avatar.Group max={3}>
  <Avatar src="path/to/image1.jpg" alt="User 1" />
  <Avatar src="path/to/image2.jpg" alt="User 2" />
  <Avatar src="path/to/image3.jpg" alt="User 3" />
  <Avatar src="path/to/image4.jpg" alt="User 4" />
  <Avatar src="path/to/image5.jpg" alt="User 5" />
</Avatar.Group>
```

### Tabs

```jsx
import { Tabs, TabItem, TabPanel } from './components/ui';

<Tabs>
  <TabItem>Tab 1</TabItem>
  <TabItem>Tab 2</TabItem>
  <TabItem>Tab 3</TabItem>
  <TabPanel>
    <p>Content for Tab 1</p>
  </TabPanel>
  <TabPanel>
    <p>Content for Tab 2</p>
  </TabPanel>
  <TabPanel>
    <p>Content for Tab 3</p>
  </TabPanel>
</Tabs>

// Variants
<Tabs variant="pills">...</Tabs>
<Tabs variant="underline">...</Tabs>

// Disabled tab
<TabItem disabled>Disabled</TabItem>
```

### Loaders

```jsx
import { Loader } from './components/ui';

// Sizes
<Loader size="sm" />
<Loader />
<Loader size="lg" />
<Loader size="xl" />

// Variants
<Loader variant="yellow" />
<Loader variant="blue" />
<Loader variant="pink" />

// With label
<Loader showLabel />
<Loader showLabel label="Processing..." />
```

### Tooltips

```jsx
import { Tooltip } from './components/ui';

// Positions
<Tooltip content="Top tooltip" position="top">
  <Button>Hover me (Top)</Button>
</Tooltip>
<Tooltip content="Bottom tooltip" position="bottom">
  <Button>Hover me (Bottom)</Button>
</Tooltip>
<Tooltip content="Left tooltip" position="left">
  <Button>Hover me (Left)</Button>
</Tooltip>
<Tooltip content="Right tooltip" position="right">
  <Button>Hover me (Right)</Button>
</Tooltip>

// Variants
<Tooltip content="Dark tooltip" variant="dark">
  <Button>Dark</Button>
</Tooltip>
<Tooltip content="Yellow tooltip" variant="yellow">
  <Button>Yellow</Button>
</Tooltip>
<Tooltip content="Blue tooltip" variant="blue">
  <Button>Blue</Button>
</Tooltip>
<Tooltip content="Pink tooltip" variant="pink">
  <Button>Pink</Button>
</Tooltip>
```

### Modal

```jsx
import { Modal } from './components/ui';

const [isModalOpen, setIsModalOpen] = useState(false);

<Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>

<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Example Modal"
>
  <p>This is an example modal with a title and content.</p>
  
  <Modal.Footer>
    <Button
      variant="outline"
      onClick={() => setIsModalOpen(false)}
    >
      Cancel
    </Button>
    <Button onClick={() => setIsModalOpen(false)}>
      Confirm
    </Button>
  </Modal.Footer>
</Modal>

// Sizes
<Modal size="sm">...</Modal>
<Modal size="md">...</Modal>
<Modal size="lg">...</Modal>
<Modal size="xl">...</Modal>
<Modal size="full">...</Modal>
```

## Usage

To use the component library, import the components from the `components/ui` directory:

```jsx
import { Button, Card, Form, Navigation } from './components/ui';
```

## Customization

The component library uses Tailwind CSS for styling. You can customize the components by:

1. Modifying the `tailwind.config.js` file to update the color palette, typography, etc.
2. Passing custom className props to components
3. Extending the components with additional variants or features