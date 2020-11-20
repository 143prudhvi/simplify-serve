package com.simplify.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.simplify.myapp.web.rest.TestUtil;

public class BoardTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Board.class);
        Board board1 = new Board();
        board1.setId(1L);
        Board board2 = new Board();
        board2.setId(board1.getId());
        assertThat(board1).isEqualTo(board2);
        board2.setId(2L);
        assertThat(board1).isNotEqualTo(board2);
        board1.setId(null);
        assertThat(board1).isNotEqualTo(board2);
    }
}
