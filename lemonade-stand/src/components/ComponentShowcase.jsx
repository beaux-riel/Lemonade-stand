import React, { useState } from 'react';
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Form,
  Loader,
  Modal,
  Navigation,
  Tabs,
  TabItem,
  TabPanel,
  Tooltip
} from './ui';

const ComponentShowcase = () => {
  // State for form elements
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: '',
    fruit: '',
    newsletter: false,
    preference: 'lemonade'
  });
  
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted: ' + JSON.stringify(formValues, null, 2));
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-display text-lemonade-blue-dark mb-8">Lemonade Stand UI Component Library</h1>
      
      {/* Navigation */}
      <section className="mb-12">
        <h2 className="text-2xl font-display text-lemonade-pink-dark mb-4">Navigation</h2>
        <div className="mb-6">
          <Navigation
            brand={<span className="text-xl font-bold">🍋 Lemonade Stand</span>}
            items={[
              { label: 'Home', href: '#', active: true },
              { label: 'Stands', href: '#' },
              { label: 'Products', href: '#' },
              { label: 'About', href: '#' },
              { label: 'Contact', href: '#' },
            ]}
          />
        </div>
        <div className="mb-6">
          <Navigation
            variant="blue"
            brand={<span className="text-xl font-bold">🍋 Lemonade Stand</span>}
            items={[
              { label: 'Home', href: '#', active: true },
              { label: 'Stands', href: '#' },
              { label: 'Products', href: '#' },
              { label: 'About', href: '#' },
              { label: 'Contact', href: '#' },
            ]}
          />
        </div>
      </section>
      
      {/* Buttons */}
      <section className="mb-12">
        <h2 className="text-2xl font-display text-lemonade-pink-dark mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-4 mb-6">
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <div className="flex flex-wrap gap-4 mb-6">
          <Button size="sm">Small</Button>
          <Button>Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </div>
        <div className="flex flex-wrap gap-4 mb-6">
          <Button rounded="none">Square</Button>
          <Button rounded="sm">Rounded SM</Button>
          <Button rounded="md">Rounded MD</Button>
          <Button rounded="lg">Rounded LG</Button>
          <Button rounded="full">Pill</Button>
        </div>
        <div className="flex flex-wrap gap-4 mb-6">
          <Button disabled>Disabled</Button>
          <Button animated>Animated</Button>
          <Button fullWidth>Full Width Button</Button>
        </div>
      </section>
      
      {/* Cards */}
      <section className="mb-12">
        <h2 className="text-2xl font-display text-lemonade-pink-dark mb-4">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          
          <Card variant="yellow" hover>
            <Card.Header>
              <h3 className="text-xl font-display">Yellow Card</h3>
            </Card.Header>
            <Card.Body>
              <p>This is a yellow card with hover effect.</p>
            </Card.Body>
            <Card.Footer>
              <Button size="sm" variant="secondary">Action</Button>
            </Card.Footer>
          </Card>
          
          <Card variant="blue" rounded="xl">
            <Card.Header>
              <h3 className="text-xl font-display text-white">Blue Card</h3>
            </Card.Header>
            <Card.Body>
              <p className="text-white">This is a blue card with extra rounded corners.</p>
            </Card.Body>
            <Card.Footer>
              <Button size="sm" variant="accent">Action</Button>
            </Card.Footer>
          </Card>
        </div>
      </section>
      
      {/* Forms */}
      <section className="mb-12">
        <h2 className="text-2xl font-display text-lemonade-pink-dark mb-4">Forms</h2>
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="name" required>Name</Form.Label>
                <Form.Input
                  id="name"
                  name="name"
                  value={formValues.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                />
              </Form.Group>
              
              <Form.Group>
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Input
                  id="email"
                  name="email"
                  type="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                />
              </Form.Group>
              
              <Form.Group>
                <Form.Label htmlFor="message">Message</Form.Label>
                <Form.Textarea
                  id="message"
                  name="message"
                  value={formValues.message}
                  onChange={handleInputChange}
                  placeholder="Enter your message"
                  rows={3}
                />
              </Form.Group>
              
              <Form.Group>
                <Form.Label htmlFor="fruit">Favorite Fruit</Form.Label>
                <Form.Select
                  id="fruit"
                  name="fruit"
                  value={formValues.fruit}
                  onChange={handleInputChange}
                  options={[
                    { value: 'lemon', label: 'Lemon' },
                    { value: 'orange', label: 'Orange' },
                    { value: 'lime', label: 'Lime' },
                    { value: 'strawberry', label: 'Strawberry' },
                  ]}
                />
              </Form.Group>
              
              <Form.Group>
                <Form.Checkbox
                  id="newsletter"
                  name="newsletter"
                  checked={formValues.newsletter}
                  onChange={handleInputChange}
                  label="Subscribe to newsletter"
                />
              </Form.Group>
              
              <Form.Group>
                <Form.Label>Preference</Form.Label>
                <div className="space-y-2">
                  <Form.Radio
                    id="preference-lemonade"
                    name="preference"
                    value="lemonade"
                    checked={formValues.preference === 'lemonade'}
                    onChange={handleInputChange}
                    label="Lemonade"
                  />
                  <Form.Radio
                    id="preference-orangeade"
                    name="preference"
                    value="orangeade"
                    checked={formValues.preference === 'orangeade'}
                    onChange={handleInputChange}
                    label="Orangeade"
                  />
                </div>
              </Form.Group>
              
              <div className="flex justify-end mt-6">
                <Button type="submit">Submit</Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </section>
      
      {/* Alerts */}
      <section className="mb-12">
        <h2 className="text-2xl font-display text-lemonade-pink-dark mb-4">Alerts</h2>
        <div className="space-y-4">
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
            icon={
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            }
          >
            This is a dismissible alert with an icon.
          </Alert>
        </div>
      </section>
      
      {/* Badges */}
      <section className="mb-12">
        <h2 className="text-2xl font-display text-lemonade-pink-dark mb-4">Badges</h2>
        <div className="flex flex-wrap gap-4 mb-6">
          <Badge>Default</Badge>
          <Badge variant="blue">Blue</Badge>
          <Badge variant="pink">Pink</Badge>
          <Badge variant="green">Green</Badge>
          <Badge variant="red">Red</Badge>
          <Badge variant="gray">Gray</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
        <div className="flex flex-wrap gap-4 mb-6">
          <Badge size="sm">Small</Badge>
          <Badge>Medium</Badge>
          <Badge size="lg">Large</Badge>
        </div>
        <div className="flex flex-wrap gap-4">
          <Badge rounded="none">Square</Badge>
          <Badge rounded="sm">Rounded SM</Badge>
          <Badge rounded="md">Rounded MD</Badge>
          <Badge>Rounded Full</Badge>
        </div>
      </section>
      
      {/* Avatars */}
      <section className="mb-12">
        <h2 className="text-2xl font-display text-lemonade-pink-dark mb-4">Avatars</h2>
        <div className="flex flex-wrap gap-4 mb-6">
          <Avatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Tom Cook"
            size="xs"
          />
          <Avatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Tom Cook"
            size="sm"
          />
          <Avatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Tom Cook"
          />
          <Avatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Tom Cook"
            size="lg"
          />
          <Avatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Tom Cook"
            size="xl"
          />
        </div>
        <div className="flex flex-wrap gap-4 mb-6">
          <Avatar alt="John Doe" />
          <Avatar alt="Jane Smith" variant="square" />
          <Avatar alt="Bob Johnson" variant="rounded" />
        </div>
        <div className="flex flex-wrap gap-4 mb-6">
          <Avatar alt="John Doe" status="online" />
          <Avatar alt="Jane Smith" status="offline" />
          <Avatar alt="Bob Johnson" status="busy" />
          <Avatar alt="Alice Brown" status="away" />
        </div>
        <div className="mb-6">
          <Avatar.Group>
            <Avatar
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User 1"
            />
            <Avatar
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User 2"
            />
            <Avatar
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              alt="User 3"
            />
            <Avatar
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User 4"
            />
          </Avatar.Group>
        </div>
        <div>
          <Avatar.Group max={3}>
            <Avatar
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User 1"
            />
            <Avatar
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User 2"
            />
            <Avatar
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              alt="User 3"
            />
            <Avatar
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User 4"
            />
            <Avatar
              src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User 5"
            />
          </Avatar.Group>
        </div>
      </section>
      
      {/* Tabs */}
      <section className="mb-12">
        <h2 className="text-2xl font-display text-lemonade-pink-dark mb-4">Tabs</h2>
        <div className="mb-8">
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
        </div>
        <div className="mb-8">
          <Tabs variant="pills">
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
        </div>
        <div>
          <Tabs variant="underline">
            <TabItem>Tab 1</TabItem>
            <TabItem>Tab 2</TabItem>
            <TabItem disabled>Disabled</TabItem>
            <TabPanel>
              <p>Content for Tab 1</p>
            </TabPanel>
            <TabPanel>
              <p>Content for Tab 2</p>
            </TabPanel>
            <TabPanel>
              <p>Content for Disabled Tab</p>
            </TabPanel>
          </Tabs>
        </div>
      </section>
      
      {/* Loaders */}
      <section className="mb-12">
        <h2 className="text-2xl font-display text-lemonade-pink-dark mb-4">Loaders</h2>
        <div className="flex flex-wrap gap-8 mb-6">
          <Loader size="sm" />
          <Loader />
          <Loader size="lg" />
          <Loader size="xl" />
        </div>
        <div className="flex flex-wrap gap-8 mb-6">
          <Loader variant="yellow" />
          <Loader variant="blue" />
          <Loader variant="pink" />
        </div>
        <div className="flex flex-wrap gap-8">
          <Loader showLabel />
          <Loader showLabel label="Processing..." />
        </div>
      </section>
      
      {/* Tooltips */}
      <section className="mb-12">
        <h2 className="text-2xl font-display text-lemonade-pink-dark mb-4">Tooltips</h2>
        <div className="flex flex-wrap gap-8 mb-6">
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
        </div>
        <div className="flex flex-wrap gap-8">
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
        </div>
      </section>
      
      {/* Modal */}
      <section className="mb-12">
        <h2 className="text-2xl font-display text-lemonade-pink-dark mb-4">Modal</h2>
        <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
        
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Example Modal"
        >
          <p className="mb-4">This is an example modal with a title and content.</p>
          <p className="mb-4">You can close it by clicking the X button, clicking outside, or pressing the ESC key.</p>
          
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
      </section>
    </div>
  );
};

export default ComponentShowcase;