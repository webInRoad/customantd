import React from 'react'
import {  Meta,Story } from '@storybook/react/types-6-0';
import Button,{ButtonProps,ButtonSize,ButtonType} from './button'

export default {
    title: 'Button组件',
    component: Button,
    argTypes: {
      backgroundColor: { control: 'color' },
    },
  } as Meta;

  const Template: Story<ButtonProps> = (args) => <Button {...args} >确认</Button>;

export const Primary = Template.bind({});
Primary.args = {
    btnType:'primary'
};