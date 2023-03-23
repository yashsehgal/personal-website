import { getContacts } from '@/lib/contacts';
import { cn } from '@/lib/utils';
import React from 'react';
import Section from '../layout/Section';
import LinkText from '../ui/LinkText';

interface ContactItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  link?: {
    display?: string;
    url?: string;
  };
}

const ContactSection: React.FunctionComponent = () => {
  return (
    <Section
      className="contacts-section grid grid-cols-1 justify-start gap-4"
      id="contact">
      <h2 className="contact-heading leading-snug font-medium text-base text-zinc-900">
        {'contact, socials.'}
      </h2>
      <Section className="project-item-list-wrapper mt-4 grid grid-cols-1 justify-start gap-4">
        {getContacts()?.map((contact, contactIndex) => (
          <ContactItem {...contact} key={contactIndex} />
        ))}
      </Section>
    </Section>
  );
};

const ContactItem: React.FunctionComponent<ContactItemProps> = ({
  title,
  link,
  className,
  ...attr
}) => {
  return (
    <div
      className={cn(
        'contact-item flex flex-row items-center justify-start gap-4',
        className,
      )}
      {...attr}>
      <span className="contact-title font-normal text-sm">{title}</span>
      <span className="contact-link-content">
        {link?.url && (
          <LinkText
            className="text-sm font-normal text-zinc-500"
            href={link?.url}>
            {link?.display}
          </LinkText>
        )}
        {!link?.url && (
          <span className="text-sm font-normal text-zinc-500">
            {'link not found'}
          </span>
        )}
      </span>
    </div>
  );
};

export default ContactSection;
export type { ContactItemProps };
