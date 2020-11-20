package com.simplify.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.simplify.myapp.web.rest.TestUtil;

public class SlipTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Slip.class);
        Slip slip1 = new Slip();
        slip1.setId(1L);
        Slip slip2 = new Slip();
        slip2.setId(slip1.getId());
        assertThat(slip1).isEqualTo(slip2);
        slip2.setId(2L);
        assertThat(slip1).isNotEqualTo(slip2);
        slip1.setId(null);
        assertThat(slip1).isNotEqualTo(slip2);
    }
}
