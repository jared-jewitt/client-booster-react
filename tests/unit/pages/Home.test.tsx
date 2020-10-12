import React from "react";
import { shallow } from "enzyme";

import { AuthProvider } from "@/store";
import { HomePage } from "@/pages";

describe("Unit - HomePage", () => {
  it("renders correctly", () => {
    const wrapper = shallow(
      <AuthProvider>
        <HomePage />
      </AuthProvider>
    );

    expect(wrapper).toMatchSnapshot();
  });
});