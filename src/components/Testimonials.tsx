import React from 'react';
import PropTypes from 'prop-types';
import {v4} from 'uuid';

const Testimonials = ({testimonials}: TestimonialsProps) => (
    <div>
        {testimonials.map(testimonial => (
            <article key={v4()} className="message">
                <div className="message-body">
                    {testimonial.quote}
                    <br/>
                    <cite> – {testimonial.author}</cite>
                </div>
            </article>
        ))}
    </div>
);

interface TestimonialsProps {
    testimonials: {
        quote: string,
        author: string,
    }[];
}

export default Testimonials;
