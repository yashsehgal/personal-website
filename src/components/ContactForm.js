
import { useForm, ValidationError } from '@formspree/react';

export default function ContactForm() {
  const [state, handleSubmit] = useForm("xyyogvrj");
  if (state.succeeded) {
      return <h3>Thanks for connecting!</h3>;
  }
  return (
      <form onSubmit={handleSubmit}>
      <div className="full-name-wrapper">
          <h4>Full Name</h4>
          <input
            id="full-name"
            type="text" 
            name="full-name"
        />
        <ValidationError 
            prefix="FullName" 
            field="text"
            errors={state.errors}
        />
      </div>
      <div className="email-wrapper">
          <h4>Email Address</h4>
        <input
            id="email"
            type="email" 
            name="email"
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
    </form>
  );
}