import React, { useState } from 'react';
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Dropdown,
  Form,
  Loader,
  Modal,
  Navigation,
  Pagination,
  Progress,
  Rating,
  Tabs,
  TabItem,
  TabPanel,
  Toggle,
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
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  
  // State for toggle
  const [toggleState, setToggleState] = useState({
    toggle1: false,
    toggle2: true,
    toggle3: false
  });
  
  // State for rating
  const [ratingValue, setRatingValue] = useState(3.5);
  
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
      
      {/* Pagination */}
      <section className="mb-12">
        <h2 className="text-2xl font-display text-lemonade-pink-dark mb-4">Pagination</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-display mb-2">Default Pagination</h3>
            <Pagination
              currentPage={currentPage}
              totalPages={10}
              onPageChange={setCurrentPage}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-display mb-2">Color Variants</h3>
            <div className="space-y-4">
              <Pagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
                variant="yellow"
              />
              <Pagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
                variant="blue"
              />
              <Pagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
                variant="pink"
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-display mb-2">Sizes</h3>
            <div className="space-y-4">
              <Pagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
                size="sm"
              />
              <Pagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
                size="lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Progress */}
      <section className="mb-12">
        <h2 className="text-2xl font-display text-lemonade-pink-dark mb-4">Progress</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-display mb-2">Basic Progress</h3>
            <div className="space-y-4">
              <Progress value={25} />
              <Progress value={50} />
              <Progress value={75} />
              <Progress value={100} />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-display mb-2">Color Variants</h3>
            <div className="space-y-4">
              <Progress value={75} variant="yellow" />
              <Progress value={75} variant="blue" />
              <Progress value={75} variant="pink" />
              <Progress value={75} variant="green" />
              <Progress value={75} variant="red" />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-display mb-2">Sizes</h3>
            <div className="space-y-4">
              <Progress value={75} size="xs" />
              <Progress value={75} size="sm" />
              <Progress value={75} size="md" />
              <Progress value={75} size="lg" />
              <Progress value={75} size="xl" />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-display mb-2">With Labels</h3>
            <div className="space-y-4">
              <Progress value={75} showLabel />
              <Progress value={75} showLabel labelPosition="top" />
              <Progress value={75} showLabel labelPosition="right" />
              <Progress value={75} showLabel labelPosition="bottom" />
              <Progress value={75} showLabel labelPosition="left" />
              <Progress value={75} showLabel labelPosition="inside" size="lg" />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-display mb-2">Variants</h3>
            <div className="space-y-4">
              <Progress value={75} striped />
              <Progress value={75} animated />
              <Progress value={75} rounded={false} />
              <Progress value={75} striped animated />
            </div>
          </div>
        </div>
      </section>
      
      {/* Toggle */}
      <section className="mb-12">
        <h2 className="text-2xl font-display text-lemonade-pink-dark mb-4">Toggle</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-display mb-2">Basic Toggle</h3>
            <div className="space-y-4">
              <Toggle
                checked={toggleState.toggle1}
                onChange={() => setToggleState({ ...toggleState, toggle1: !toggleState.toggle1 })}
                label="Toggle me"
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-display mb-2">Color Variants</h3>
            <div className="space-y-4">
              <Toggle
                checked={toggleState.toggle1}
                onChange={() => setToggleState({ ...toggleState, toggle1: !toggleState.toggle1 })}
                label="Yellow Toggle"
                variant="yellow"
              />
              <Toggle
                checked={toggleState.toggle2}
                onChange={() => setToggleState({ ...toggleState, toggle2: !toggleState.toggle2 })}
                label="Blue Toggle"
                variant="blue"
              />
              <Toggle
                checked={toggleState.toggle3}
                onChange={() => setToggleState({ ...toggleState, toggle3: !toggleState.toggle3 })}
                label="Pink Toggle"
                variant="pink"
              />
              <Toggle
                checked={toggleState.toggle1}
                onChange={() => setToggleState({ ...toggleState, toggle1: !toggleState.toggle1 })}
                label="Green Toggle"
                variant="green"
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-display mb-2">Sizes</h3>
            <div className="space-y-4">
              <Toggle
                checked={toggleState.toggle2}
                onChange={() => setToggleState({ ...toggleState, toggle2: !toggleState.toggle2 })}
                label="Small Toggle"
                size="sm"
              />
              <Toggle
                checked={toggleState.toggle2}
                onChange={() => setToggleState({ ...toggleState, toggle2: !toggleState.toggle2 })}
                label="Medium Toggle"
                size="md"
              />
              <Toggle
                checked={toggleState.toggle2}
                onChange={() => setToggleState({ ...toggleState, toggle2: !toggleState.toggle2 })}
                label="Large Toggle"
                size="lg"
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-display mb-2">Label Position</h3>
            <div className="space-y-4">
              <Toggle
                checked={toggleState.toggle2}
                onChange={() => setToggleState({ ...toggleState, toggle2: !toggleState.toggle2 })}
                label="Label on Right"
                labelPosition="right"
              />
              <Toggle
                checked={toggleState.toggle2}
                onChange={() => setToggleState({ ...toggleState, toggle2: !toggleState.toggle2 })}
                label="Label on Left"
                labelPosition="left"
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-display mb-2">Disabled</h3>
            <div className="space-y-4">
              <Toggle
                checked={true}
                onChange={() => {}}
                label="Disabled Toggle (On)"
                disabled
              />
              <Toggle
                checked={false}
                onChange={() => {}}
                label="Disabled Toggle (Off)"
                disabled
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Rating */}
      <section className="mb-12">
        <h2 className="text-2xl font-display text-lemonade-pink-dark mb-4">Rating</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-display mb-2">Basic Rating</h3>
            <div className="space-y-4">
              <Rating
                value={ratingValue}
                onChange={setRatingValue}
                showValue
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-display mb-2">Color Variants</h3>
            <div className="space-y-4">
              <Rating value={3.5} variant="yellow" />
              <Rating value={3.5} variant="blue" />
              <Rating value={3.5} variant="pink" />
              <Rating value={3.5} variant="gold" />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-display mb-2">Sizes</h3>
            <div className="space-y-4">
              <Rating value={3.5} size="sm" />
              <Rating value={3.5} size="md" />
              <Rating value={3.5} size="lg" />
              <Rating value={3.5} size="xl" />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-display mb-2">Icons</h3>
            <div className="space-y-4">
              <Rating value={3.5} icon="star" />
              <Rating value={3.5} icon="heart" />
              <Rating value={3.5} icon="list" />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-display mb-2">Precision</h3>
            <div className="space-y-4">
              <Rating value={3.5} precision={0.5} showValue />
              <Rating value={3.2} precision={0.1} showValue />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-display mb-2">Read Only</h3>
            <div className="space-y-4">
              <Rating value={3.5} readOnly />
            </div>
          </div>
        </div>
      </section>
      
      {/* Dropdown */}
      <section className="mb-12">
        <h2 className="text-2xl font-display text-lemonade-pink-dark mb-4">Dropdown</h2>
        <div className="flex flex-wrap gap-8">
          <div>
            <h3 className="text-lg font-display mb-2">Basic Dropdown</h3>
            <Dropdown
              trigger={<Button>Click me</Button>}
            >
              <Dropdown.Item onClick={() => alert('Item 1 clicked')}>Item 1</Dropdown.Item>
              <Dropdown.Item onClick={() => alert('Item 2 clicked')}>Item 2</Dropdown.Item>
              <Dropdown.Item onClick={() => alert('Item 3 clicked')}>Item 3</Dropdown.Item>
            </Dropdown>
          </div>
          
          <div>
            <h3 className="text-lg font-display mb-2">With Header and Divider</h3>
            <Dropdown
              trigger={<Button variant="secondary">Options</Button>}
            >
              <Dropdown.Header>Menu</Dropdown.Header>
              <Dropdown.Item onClick={() => alert('Edit clicked')}>Edit</Dropdown.Item>
              <Dropdown.Item onClick={() => alert('Duplicate clicked')}>Duplicate</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => alert('Archive clicked')}>Archive</Dropdown.Item>
              <Dropdown.Item onClick={() => alert('Delete clicked')}>Delete</Dropdown.Item>
            </Dropdown>
          </div>
          
          <div>
            <h3 className="text-lg font-display mb-2">Alignment</h3>
            <div className="flex gap-4">
              <Dropdown
                trigger={<Button size="sm">Left</Button>}
                align="left"
              >
                <Dropdown.Item>Item 1</Dropdown.Item>
                <Dropdown.Item>Item 2</Dropdown.Item>
              </Dropdown>
              
              <Dropdown
                trigger={<Button size="sm">Center</Button>}
                align="center"
              >
                <Dropdown.Item>Item 1</Dropdown.Item>
                <Dropdown.Item>Item 2</Dropdown.Item>
              </Dropdown>
              
              <Dropdown
                trigger={<Button size="sm">Right</Button>}
                align="right"
              >
                <Dropdown.Item>Item 1</Dropdown.Item>
                <Dropdown.Item>Item 2</Dropdown.Item>
              </Dropdown>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-display mb-2">Width</h3>
            <Dropdown
              trigger={<Button>Width</Button>}
              width="md"
            >
              <Dropdown.Item>This is a wider dropdown menu</Dropdown.Item>
              <Dropdown.Item>With more content</Dropdown.Item>
            </Dropdown>
          </div>
          
          <div>
            <h3 className="text-lg font-display mb-2">Variants</h3>
            <div className="flex gap-4">
              <Dropdown
                trigger={<Button size="sm">White</Button>}
                variant="white"
              >
                <Dropdown.Item>Item 1</Dropdown.Item>
                <Dropdown.Item>Item 2</Dropdown.Item>
              </Dropdown>
              
              <Dropdown
                trigger={<Button size="sm">Yellow</Button>}
                variant="yellow"
              >
                <Dropdown.Item>Item 1</Dropdown.Item>
                <Dropdown.Item>Item 2</Dropdown.Item>
              </Dropdown>
              
              <Dropdown
                trigger={<Button size="sm">Blue</Button>}
                variant="blue"
              >
                <Dropdown.Item>Item 1</Dropdown.Item>
                <Dropdown.Item>Item 2</Dropdown.Item>
              </Dropdown>
              
              <Dropdown
                trigger={<Button size="sm">Pink</Button>}
                variant="pink"
              >
                <Dropdown.Item>Item 1</Dropdown.Item>
                <Dropdown.Item>Item 2</Dropdown.Item>
              </Dropdown>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComponentShowcase;