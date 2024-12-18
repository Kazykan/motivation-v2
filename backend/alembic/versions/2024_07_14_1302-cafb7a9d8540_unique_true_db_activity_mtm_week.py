"""unique true db activity_mtm_week

Revision ID: cafb7a9d8540
Revises: a4d6303da152
Create Date: 2024-07-14 13:02:32.503805

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'cafb7a9d8540'
down_revision: Union[str, None] = 'a4d6303da152'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(None, 'activity_mtm_week', ['activity_id'])
    op.create_unique_constraint(None, 'activity_mtm_week', ['week_id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'activity_mtm_week', type_='unique')
    op.drop_constraint(None, 'activity_mtm_week', type_='unique')
    # ### end Alembic commands ###
