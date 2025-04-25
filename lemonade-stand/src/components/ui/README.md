# Lemonade Stand UI Component Library

A bright, colorful, child-friendly UI component library for the Lemonade Stand application. This library provides reusable components with a playful design using a yellow, pink, and blue color palette.

![Lemonade Stand UI](https://img.shields.io/badge/Lemonade%20Stand-UI%20Library-yellow)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-blue)

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

## Pagination

```jsx
import { Pagination } from './components/ui';

const [currentPage, setCurrentPage] = useState(1);

<Pagination
  currentPage={currentPage}
  totalPages={10}
  onPageChange={setCurrentPage}
/>

// Variants
<Pagination variant="yellow" currentPage={1} totalPages={10} onPageChange={setPage} />
<Pagination variant="blue" currentPage={1} totalPages={10} onPageChange={setPage} />
<Pagination variant="pink" currentPage={1} totalPages={10} onPageChange={setPage} />

// Sizes
<Pagination size="sm" currentPage={1} totalPages={10} onPageChange={setPage} />
<Pagination size="md" currentPage={1} totalPages={10} onPageChange={setPage} />
<Pagination size="lg" currentPage={1} totalPages={10} onPageChange={setPage} />
```

## Progress

```jsx
import { Progress } from './components/ui';

// Basic usage
<Progress value={75} />

// Variants
<Progress value={75} variant="yellow" />
<Progress value={75} variant="blue" />
<Progress value={75} variant="pink" />
<Progress value={75} variant="green" />
<Progress value={75} variant="red" />

// Sizes
<Progress value={75} size="xs" />
<Progress value={75} size="sm" />
<Progress value={75} size="md" />
<Progress value={75} size="lg" />
<Progress value={75} size="xl" />

// With labels
<Progress value={75} showLabel />
<Progress value={75} showLabel labelPosition="top" />
<Progress value={75} showLabel labelPosition="right" />
<Progress value={75} showLabel labelPosition="bottom" />
<Progress value={75} showLabel labelPosition="left" />
<Progress value={75} showLabel labelPosition="inside" size="lg" />

// Variants
<Progress value={75} striped />
<Progress value={75} animated />
<Progress value={75} rounded={false} />
<Progress value={75} striped animated />
```

## Toggle

```jsx
import { Toggle } from './components/ui';

const [checked, setChecked] = useState(false);

<Toggle
  checked={checked}
  onChange={() => setChecked(!checked)}
  label="Toggle me"
/>

// Variants
<Toggle checked={checked} onChange={handleChange} variant="yellow" label="Yellow" />
<Toggle checked={checked} onChange={handleChange} variant="blue" label="Blue" />
<Toggle checked={checked} onChange={handleChange} variant="pink" label="Pink" />
<Toggle checked={checked} onChange={handleChange} variant="green" label="Green" />

// Sizes
<Toggle checked={checked} onChange={handleChange} size="sm" label="Small" />
<Toggle checked={checked} onChange={handleChange} size="md" label="Medium" />
<Toggle checked={checked} onChange={handleChange} size="lg" label="Large" />

// Label position
<Toggle checked={checked} onChange={handleChange} labelPosition="right" label="Right" />
<Toggle checked={checked} onChange={handleChange} labelPosition="left" label="Left" />

// Disabled
<Toggle checked={true} onChange={handleChange} disabled label="Disabled (On)" />
<Toggle checked={false} onChange={handleChange} disabled label="Disabled (Off)" />
```

## Rating

```jsx
import { Rating } from './components/ui';

const [value, setValue] = useState(3.5);

<Rating
  value={value}
  onChange={setValue}
  showValue
/>

// Variants
<Rating value={3.5} variant="yellow" />
<Rating value={3.5} variant="blue" />
<Rating value={3.5} variant="pink" />
<Rating value={3.5} variant="gold" />

// Sizes
<Rating value={3.5} size="sm" />
<Rating value={3.5} size="md" />
<Rating value={3.5} size="lg" />
<Rating value={3.5} size="xl" />

// Icons
<Rating value={3.5} icon="star" />
<Rating value={3.5} icon="heart" />
<Rating value={3.5} icon="list" />

// Precision
<Rating value={3.5} precision={0.5} showValue />
<Rating value={3.2} precision={0.1} showValue />

// Read only
<Rating value={3.5} readOnly />
```

## Dropdown

```jsx
import { Dropdown } from './components/ui';

<Dropdown
  trigger={<Button>Click me</Button>}
>
  <Dropdown.Item onClick={() => alert('Item 1 clicked')}>Item 1</Dropdown.Item>
  <Dropdown.Item onClick={() => alert('Item 2 clicked')}>Item 2</Dropdown.Item>
  <Dropdown.Item onClick={() => alert('Item 3 clicked')}>Item 3</Dropdown.Item>
</Dropdown>

// With header and divider
<Dropdown trigger={<Button>Options</Button>}>
  <Dropdown.Header>Menu</Dropdown.Header>
  <Dropdown.Item>Edit</Dropdown.Item>
  <Dropdown.Item>Duplicate</Dropdown.Item>
  <Dropdown.Divider />
  <Dropdown.Item>Archive</Dropdown.Item>
  <Dropdown.Item>Delete</Dropdown.Item>
</Dropdown>

// Alignment
<Dropdown trigger={<Button>Left</Button>} align="left">...</Dropdown>
<Dropdown trigger={<Button>Center</Button>} align="center">...</Dropdown>
<Dropdown trigger={<Button>Right</Button>} align="right">...</Dropdown>

// Width
<Dropdown trigger={<Button>Width</Button>} width="md">...</Dropdown>

// Variants
<Dropdown trigger={<Button>White</Button>} variant="white">...</Dropdown>
<Dropdown trigger={<Button>Yellow</Button>} variant="yellow">...</Dropdown>
<Dropdown trigger={<Button>Blue</Button>} variant="blue">...</Dropdown>
<Dropdown trigger={<Button>Pink</Button>} variant="pink">...</Dropdown>
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