
import { useForm, ValidationError } from '@formspree/react';

export default function ContactForm(ContactFormProperties) {
  const [state, handleSubmit] = useForm("xyyogvrj");
  if (state.succeeded) {
      return <h3>Thanks for connecting!</h3>;
  }
  return (
      <form onSubmit={handleSubmit}>
      <div className="full-name-wrapper" style={{
        marginBottom: '1em'
      }}>
          <h4 style={{
              color: ContactFormProperties.textColor,
              marginBottom: '1em'
            }}
            >
          Full Name
        </h4>
          <input
            id="full-name"
            type="text" 
            name="full-name"
            placeholder="Your Full Name"
            style={{
                color: ContactFormProperties.textColor,
                width: '100%'
            }}
        />
        <ValidationError 
            prefix="FullName" 
            field="text"
            errors={state.errors}
        />
      </div>
      <div className="email-wrapper" style={{
        marginBottom: '1em'
      }}>
          <h4 style={{
              color: ContactFormProperties.textColor,
              marginBottom: '1em'
          }}>
              Email Address
        </h4>
        <input
            id="email"
            type="email" 
            name="email"
            placeholder="Your Email Address"
            style={{
                color: ContactFormProperties.textColor,
                width: '100%'
            }}
        />
        <ValidationError 
            prefix="Email" 
            field="email"
            errors={state.errors}
        />
      </div>
      <button type="submit" className="primary-btn" disabled={state.submitting}>
        Submit
      </button>
      <button className="outline-btn outline-btn__danger"
          style={{ marginTop: '1em', marginLeft: '1em' }}
          onClick={() => ContactFormProperties.modalState(false)}
      >Close</button>
    </form>
  );
}